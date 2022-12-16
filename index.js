const sequelize = require('./server/libs/sequelize');
const express = require('express');
const { logErrors, boomErrorHandler, errorHandler, sequelizeErrorHandler } = require('./server/middlewares/error');
const routerApi = require('./server/routes');
const { tokenHandler } = require('./server/middlewares/auth');
const app = express();
const port = 3000;


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.use(tokenHandler);

routerApi(app)
   
// app.use(logErrors);
app.use(boomErrorHandler);
app.use(sequelizeErrorHandler);
app.use(errorHandler);

