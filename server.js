const http = require("http");

http.createServer((req, res) => {
  res.write("Welcome to my first Node.js server!");
  res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000/");