const express = require("express");
const userRouter=require("./routes/user")
const fs=require('fs');
const {connectionMongoDB} = require('./connection')
const app = express();
const {logReqRes}=require('./middlewares/index')

//MiddleWare --(like plugins)
app.use(express.urlencoded({ extended : false}));
 app.use(logReqRes("log.txt"));

//connection
connectionMongoDB("mongodb://127.0.0.1:27017/nodeproject1").then(()=>{
    console.log("MongoDB Connected!");
})



const PORT = 7070;

//connection
// mongoose.connect("mongodb://127.0.0.1:27017/nodeproject1")
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log("ERROr-------", err))





//Routes
app.use("/api/user", userRouter);   






//RESTFUL part
// app.get("/", (req, res) => {
//   res.end("This is the Home PAGE");
// });
// app.get("/api/user", async (req, res) => {
//         let allDbUsers=await User.find()

//  return res.json(allDbUsers);
// });




//server ko start karna
app.listen(PORT, () => {
  console.log("Server Started on " + PORT);
});
