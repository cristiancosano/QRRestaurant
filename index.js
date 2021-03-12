const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello world! This is the first code of our app =)")
})

app.listen(port, () => {
    console.log(`QRRestaurant listening at http://localhost:${port}`)
})