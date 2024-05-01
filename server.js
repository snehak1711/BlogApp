const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require('path')

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
//rest objecct
const app = express();

//mongodb connection
connectDB();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Port
const PORT = process.env.PORT || 8080;
//LISTEN
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgMagenta
      .white
    );
  });