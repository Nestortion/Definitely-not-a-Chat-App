let accessToken = ''

const setAccessToken = (token) => {
  accessToken = token
}

const getAccessToken = () => {
  return accessToken
}

export { setAccessToken, getAccessToken }
