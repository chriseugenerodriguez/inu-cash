import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import invariant from 'tiny-invariant'

interface NetworkConnectorArguments {
  urls: { [chainId: number]: string }
  defaultChainId?: number
}

// taken from ethers.js, compatible interface with web3 provider
type AsyncSendable = {
  isMetaMask?: boolean
  host?: string
  path?: string
  sendAsync?: (request: any, callback: (error: any, response: any) => void) => void
  send?: (request: any, callback: (error: any, response: any) => void) => void
}

class RequestError extends Error {
  constructor(message: string, public code: number, public data?: unknown) {
    super(message)
  }
}

interface BatchItem {
  request: { jsonrpc: '2.0'; id: number; method: string; params: unknown }
  resolve: (result: any) => void
  reject: (error: Error) => void
}

export class MiniRpcProvider implements AsyncSendable {
  public readonly isMetaMask: false = false
  public readonly chainId: number
  public readonly url: string
  public readonly host: string
  public readonly path: string
  public readonly batchWaitTimeMs: number

  private nextId = 1
  private batchTimeoutId: ReturnType<typeof setTimeout> | null = null
  private batch: BatchItem[] = []

  constructor(chainId: number, url: string, batchWaitTimeMs?: number) {
    this.chainId = chainId
    this.url = url
    const parsed = new URL(url)
    this.host = parsed.host
    this.path = parsed.pathname
    // how long to wait to batch calls
    this.batchWaitTimeMs = batchWaitTimeMs ?? 50
  }

  public readonly clearBatch = async () => {
    const batch = this.batch
    this.batch = []
    this.batchTimeoutId = null
    if (!batch.length) return
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20000)
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(batch.map((item) => item.request)),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`RPC request failed (${response.status})`)
      const json = await response.json()
      if (!Array.isArray(json)) throw new Error('RPC endpoint did not return a batch response')
      // Match by ID: providers may reorder, omit, or add response entries.
      for (const item of batch) {
        const result = json.find((entry) => entry && entry.id === item.request.id)
        if (result && 'error' in result) {
          item.reject(new RequestError(result.error?.message, result.error?.code, result.error?.data))
        } else if (result && 'result' in result) {
          item.resolve(result.result)
        } else {
          item.reject(new Error(`Missing RPC result for ${item.request.method}`))
        }
      }
    } catch (error) {
      batch.forEach(({ reject }) => reject(new Error(
        controller.signal.aborted ? 'RPC request timed out. Please retry.' : 'Unable to reach the Ethereum RPC endpoint.'
      )))
    } finally {
      clearTimeout(timeout)
    }
  }

  public readonly sendAsync = (
    request: {
      jsonrpc: '2.0'
      id: number | string | null
      method: string
      params?: unknown[] | Record<string, unknown>
    },
    callback: (error: any, response: any) => void
  ): void => {
    this.request(request.method, request.params)
      .then((result) => callback(null, { jsonrpc: '2.0', id: request.id, result }))
      .catch((error) => callback(error, null))
  }

  public readonly request = async (
    method: string | { method: string; params: unknown[] },
    params?: unknown[] | Record<string, unknown>
  ): Promise<unknown> => {
    if (typeof method !== 'string') {
      return this.request(method.method, method.params)
    }
    if (method === 'eth_chainId') {
      return `0x${this.chainId.toString(16)}`
    }
    const promise = new Promise((resolve, reject) => {
      this.batch.push({
        request: {
          jsonrpc: '2.0',
          id: this.nextId++,
          method,
          params,
        },
        resolve,
        reject,
      })
    })
    this.batchTimeoutId = this.batchTimeoutId ?? setTimeout(this.clearBatch, this.batchWaitTimeMs)
    return promise
  }
}

export class NetworkConnector extends AbstractConnector {
  private readonly providers: { [chainId: number]: MiniRpcProvider }
  private currentChainId: number

  constructor({ urls, defaultChainId }: NetworkConnectorArguments) {
    invariant(defaultChainId || Object.keys(urls).length === 1, 'defaultChainId is a required argument with >1 url')
    super({ supportedChainIds: Object.keys(urls).map((k): number => Number(k)) })

    this.currentChainId = defaultChainId || Number(Object.keys(urls)[0])
    this.providers = Object.keys(urls).reduce<{ [chainId: number]: MiniRpcProvider }>((accumulator, chainId) => {
      accumulator[Number(chainId)] = new MiniRpcProvider(Number(chainId), urls[Number(chainId)])
      return accumulator
    }, {})
  }

  public get provider(): MiniRpcProvider {
    return this.providers[this.currentChainId]
  }

  public async activate(): Promise<ConnectorUpdate> {
    return { provider: this.providers[this.currentChainId], chainId: this.currentChainId, account: null }
  }

  public async getProvider(): Promise<MiniRpcProvider> {
    return this.providers[this.currentChainId]
  }

  public async getChainId(): Promise<number> {
    return this.currentChainId
  }

  public async getAccount(): Promise<null> {
    return null
  }

  public deactivate() {
    return
  }
}
