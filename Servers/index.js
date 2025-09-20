const http = require("http"); //http does parse req.url and does not diff between path and query paramete
const fs = require("fs");
const url = require("url"); //it is use for parsing the URL

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} :${req.url} New Req Recieved.\n`;
  const myUrl = url.parse(req.url);
  console.log(myUrl);

  if (req.url === "/favicon.ico") return res.end();
  fs.appendFile("log1.txt", log, (err, data) => {
    //Always use non blocking function
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
  });
});

myServer.listen(7070, () => {
  console.log("Server Chalu start hogaya");
});
