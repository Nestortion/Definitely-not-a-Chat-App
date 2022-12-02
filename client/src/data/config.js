const rootUrl = import.meta.env.VITE_API_URL || 'http://localhost'
const apiPort = import.meta.env.VITE_API_PORT || '4000'
const wsUrl = import.meta.env.WS_URL || 'ws://localhost'
const wsPort = import.meta.env.WS_PORT || '4000'

export const apiBasePath = `${rootUrl}:${apiPort}`
export const wsBasePath = `${wsUrl}:${wsPort}`
