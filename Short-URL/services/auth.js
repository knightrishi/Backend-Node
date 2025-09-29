//This is basicallly tghe diary of the parking employee 

const sessionIDMap=new Map();

function setUser(id,user){
    sessionIDMap.set(id, user);
}

function getUser(id){
    return sessionIDMap.get(id);
}

module.exports={
    setUser,
    getUser,
}