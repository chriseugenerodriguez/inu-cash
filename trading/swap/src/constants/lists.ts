export const BUNDLED_LIST_URL = new URL(`${process.env.PUBLIC_URL || '.'}/token-list.json`, window.location.href).href
export const UNSUPPORTED_LIST_URLS: string[] = []
export const DEFAULT_LIST_OF_LISTS: string[] = [BUNDLED_LIST_URL]
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [BUNDLED_LIST_URL]
