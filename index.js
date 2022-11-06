const express = require('express');
const { logErrors, boomErrorHandler, errorHandler } = require('./server/middlewares/error');
const routerApi = require('./server/routes');
const app = express();
const port = 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);