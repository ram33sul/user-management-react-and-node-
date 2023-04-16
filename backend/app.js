const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const database = require('./config/database');
database.connect();
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use("/user", userRouter);
app.use("/admin", adminRouter);


app.listen(PORT, (error) => {
    if(error){
        console.log(error);
    } else {
        console.log(`server started at port: ${PORT}`);
    }
});
