const express=require('express')
const { handleUserSignUps, handleUserLogin }=require('../controllers/user')
const router = express.Router(); 

router.post('/', handleUserSignUps);
router.post('/login', handleUserLogin);

module.exports=router;