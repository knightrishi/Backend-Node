const express = require("express");
let users = require("./MOCK_DATA.json");
const fs=require('fs');
const { json } = require("stream/consumers");
const app = express();


//MiddleWare --(like plugins)
app.use(express.urlencoded({ extended : false}));

app.use((req,res,next)=>{
    fs.appendFile('log.txt', `${Date.now()} :${req.method} :${req.path} \n` ,(err,data) => {

    next();
    })
});

// app.use((req,res,next)=>{
//     // console.log("I am in Middleware 2");
//     // next();
//    // return res.end("Fuck OFF")
// });

const PORT = 7070;


app.get("/user", (req, res) => {
    const html=`
    <ul>
    ${users.map((user)=> `<li>${user.first_name} ${user.last_name} </li>`).join("")}
        </ul>

    `
    res.send(html);
});

//RESTFUL part
app.get("/", (req, res) => {
  res.end("This is the Home PAGE");
});
app.get("/api/user", (req, res) => {
    res.setHeader('X-myName', "Arnav Singh");//X for custom header
 return res.json(users);
});

//Dynamic Path Parameter
app.route("/api/user/:id")
.get( (req, res) => {
    
 const id=Number(req.params.id);
 const user=users.find((user)=>user.id===id)
 return res.json(user);
})
.patch( (req, res) => {
 //TODO:Edit the user with id
    return res.json({status :"pending"});
})
.delete( (req, res) => {
    const id=Number(req.params.id)
    users=users.filter(user=> user.id!=id);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
return res.json({status :"done" ,id:id });
    })
    
});


app.post("/api/user", (req, res) => {
const body=req.body;
//console.log(body);

    users.push({...body ,id:users.length+1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
return res.json({status :"success" , id: users.length});
    });
    
});


/*app.patch("/api/user/:id", (req, res) => {
 //TODO:Edit the user with id
    return res.json({status :"pending"});
});

app.delete("/api/user/:id", (req, res) => {
 //TODO:Delete the user with id
    return res.json({status :"pending"});
});
*/


//server ko start karna
app.listen(PORT, () => {
  console.log("Server Started on " + PORT);
});
