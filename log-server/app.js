const express = require('express')
const app = express()
const port = 3030

app.post('/log', (req, res) => {
    console.log(`Log received at ${Date.now()}`);
    res.send('Log received!')
})

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.listen(port, () => {
    console.log(`Log server app listening on port ${port}`)
})