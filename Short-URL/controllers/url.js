const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewURL(req, res) {
    const shortID = nanoid(8);
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    let userUrl = body.url;
    
    // This is the critical part that adds the protocol if it's missing
    if (!userUrl.startsWith('http://') && !userUrl.startsWith('https://')) {
        userUrl = `https://${userUrl}`;
    }

    await URL.create({
        shortId: shortID,
        redirectURL: userUrl, // Save the corrected, full URL
        visitHistory: [],
    });

    return res.render("home", {
        id: shortID,
    });
}

module.exports = {
    handleGenerateNewURL,
};