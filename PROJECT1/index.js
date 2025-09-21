const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();

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
}).delete( (req, res) => {
 //TODO:Delete the user with id
    return res.json({status :"pending"});
});


app.post("/api/user", (req, res) => {
 //TODO:Create New USer
    return res.json({status :"pending"});
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
