const { Console } = require("console");
const http=require("http")
const fs=require("fs")
const myServer=http.createServer((req,res)=>{
const log=`${Date.now()} :${req.url} New Req Recieved.\n`;
fs.appendFile('log.txt',log, (err,data)=>{//Always use Non-blocking function
switch (req.url) {
      case "/":
        res.end("This is the Home Page");
        break;

      case "/about":
        res.end("I am Arnav Singh and currently learning NodeJS.");
        break;

      default:
        res.statusCode = 404;
        res.end("Error 404 - File not found.");
}
})

});

myServer.listen(7070,()=>{
    console.log("Server Chalu start hogaya")
});