import express from 'express'

const app = express()

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.send('Hello from express')
})

app.listen(PORT, () => console.log(`Express server listening at port ${PORT}`))
