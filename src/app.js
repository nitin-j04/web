const express = require('express');
const app = express();
const port = 3000;
var path = require('path');


const staticPath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../views")
//to set view engine

app.set('view engine','hbs');
app.set('views',viewPath);
//built in middleware
app.use(express.static(staticPath));

//template engine route
app.get('/',(req,res) => {
  res.render('index');
});
app.get('/', (req, res) => {
   res.send("hello wolrd");
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})