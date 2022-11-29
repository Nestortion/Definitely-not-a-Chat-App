const rootUrl = import.meta.env.VITE_API_URL || 'http://localhost'
const apiPort = import.meta.env.VITE_API_PORT || '4000'

export const apiBasePath = `${rootUrl}:${apiPort}`
