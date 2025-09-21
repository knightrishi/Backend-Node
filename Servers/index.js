//const http = require("http"); //http does parse req.url and does not diff between path and query paramete
/*
const fs = require("fs");
const url = require("url"); //it is use for parsing the URL
*/

const express=require("express")

const app=express();//just like the myHandler Function jo ki internally sab hanel karta hai

app.get('/',(req,res)=>{
  res.end("This is the Home Page" + "and we welcome you "+ req.query.name);
  //req.query sab built in hai express mai
});
app.get('/about',(req,res)=>{
  res.end("This is the Arnav Singh and You are on His Server");
});
app.listen(7070,()=>{
 console.log("Server Chalu start hogaya");
});



//express is just a web framework and internally vo HTTP module ko hi use karti hai


/*const myServer = http.createServer(app);
myServer.listen(7070, () => {
  console.log("Server Chalu start hogaya");
});
*/


//Ye handler function mai manually mere ko batan apad raha tha ki kya karna hai kaise karna hai server ko baar baar swiotch case lagana pad raha tha jo ki utna fessible nahi hai isliye EXPRESS aya jo ki isko asan banata hai Vo just like this handler fn behave karta hai

/*function myHandeler(){
 const log = `${Date.now()} :${req.url} ${req.method} New Req Recieved.\n`;
  const myUrl = url.parse(req.url,true);
  

  if (req.url === "/favicon.ico") return res.end();
  fs.appendFile("log1.txt", log, (err, data) => {
    //Always use non blocking function
    switch (myUrl.pathname) {
      case "/":
        res.end("This is the Home Page");
        break;

      case "/about":
        const username=myUrl.query.myname;
        res.end(`Hi ${username},\nHow are you?`);
        break;

      default:
        res.statusCode = 404;
        res.end("Error 404 - File not found.");
    }
  });
}*/

//const myServer = http.createServer(myHandeler);


