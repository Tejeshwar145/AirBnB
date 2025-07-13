const express = require("express");
const userRouter = require("./routes/userRouter");
const {hostRouter} = require("./routes/hostRouter");
const app = express();
const path = require('path');
const rootDir = require('./utils/pathutil');
const {mongoConnect} = require("./utils/database");




app.set('view engine', 'ejs');
app.set('views','views')

app.use(express.urlencoded({extended:true}));
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir,'public')));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`the server is running on port http://localhost:${PORT}`);
  });
})
