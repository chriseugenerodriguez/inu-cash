import { MiniRpcProvider } from './NetworkConnector'

describe('read-only RPC batches', () => {
  const originalFetch = global.fetch
  afterEach(() => { global.fetch = originalFetch })

  it('matches reordered results to the correct calls', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [
      { id: 2, result: '0x20' }, { id: 1, result: '0x10' },
    ] })
    const provider = new MiniRpcProvider(1, 'https://rpc.example', 0)
    await expect(Promise.all([provider.request('eth_blockNumber'), provider.request('eth_getBalance', [])]))
      .resolves.toEqual(['0x10', '0x20'])
  })

  it('rejects missing results instead of leaving the quote pending', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => [] })
    const provider = new MiniRpcProvider(1, 'https://rpc.example', 0)
    await expect(provider.request('eth_blockNumber')).rejects.toThrow('Missing RPC result')
  })

  it('reports endpoint failures without leaking configuration', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 403 })
    const provider = new MiniRpcProvider(1, 'https://rpc.example/private-key', 0)
    await expect(provider.request('eth_blockNumber')).rejects.toThrow('Unable to reach the Ethereum RPC endpoint.')
  })

  it('rejects an invalid batch response', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ error: 'batch not supported' }) })
    const provider = new MiniRpcProvider(1, 'https://rpc.example', 0)
    await expect(provider.request('eth_blockNumber')).rejects.toThrow('Unable to reach the Ethereum RPC endpoint.')
  })
})
