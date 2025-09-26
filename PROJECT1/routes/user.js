const express = require("express");
const {handelGetAllUser,handelGetUserById,handelUpdates,handelDeleteUserById,handelCreateNewUser}=require('../controllers/user')
const router=express.Router();


router.route("/")
.get( handelGetAllUser)
.post(handelCreateNewUser);


router.route("/:id")
.get(handelGetUserById)


.patch(handelUpdates)

.delete(handelDeleteUserById);



module.exports=router;