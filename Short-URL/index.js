// D:/NODE/Short-URL/index.js (or your main file)

const express = require('express');
const urlRoute = require('./routes/url');
const app = express();
const PORT = 7072;
const { connectMongo } = require('./connect');
const URL = require('./models/url');
const path=require('path')
const staticRoute=require('./routes/staticRouter')


//to parse body
app.use(express.json());

//to parse form data

app.use(express.urlencoded({ extended:false }))

app.set('view engine' ,'ejs');
//ejs files are basicall html files

app.set("views", path.resolve("./views"));


app.use('/',staticRoute);

app.use('/test', async (req,res) => {
    const allURLs= await URL.find({})


    return res.render('home',{
        urls:allURLs,
    })
})

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId 
        },
        {
            $push: {
               
                visitHistory: { timestamp: Date.now() },
            },
        }
    );

    // FIX 3: Added a check to prevent crashing if the URL is not found
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
});

connectMongo("mongodb://localhost:27017/short-url")
    .then(() => console.log("MONGODB STARTED!"))
    

app.listen(PORT, () => {
    console.log("Server Started At:", PORT);
});