const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

routerApi(app)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})