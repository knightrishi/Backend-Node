const express=require('express')

const router = express.Router(); 

router.get('/', (req,res) => {
    return res.render("home")
})

// why ejs file in views work in rours folder's file without requiring
// // Tells Express to use the EJS templating engine
// app.set('view engine', 'ejs');
// Once you do this, Express knows that whenever you call res.render(), it should use the EJS engine to process the file.


module.exports=router;