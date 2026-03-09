const Offer = require('../model/Offer.model');

const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const https = require('https'); // Native Node.js module - no install needed

const createOffer = async (req, res) => {
    try {
        const { name, email, message, jobType } = req.body;

        // 1. Validation
        if (!name || !email || !message || !jobType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2. Save to Database
        const newOffer = { name, email, message, jobType };
        const createdOffer = await Offer.create(newOffer);

        // 3. Prepare Telegram Notification
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.MY_CHAT_ID;

        if (token && chatId) {
            const text = `=====💼 New Offer Request=====

From: ${name}
Email: ${email}
Job Type: ${jobType}
Message: ${message}`.trim();

            const data = JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            });

            const options = {
                hostname: 'api.telegram.org',
                port: 443,
                path: `/bot${token}/sendMessage`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };

            // Send the request using native HTTPS
            const telegramReq = https.request(options, (response) => {
                let responseData = '';
                response.on('data', (chunk) => { responseData += chunk; });
                response.on('end', () => {
                    const result = JSON.parse(responseData);
                    if (result.ok) {
                        console.log("✅ Telegram message sent!");
                    } else {
                        console.error("❌ Telegram API Error:", result.description);
                    }
                });
            });

            telegramReq.on('error', (err) => {
                console.error("❌ Network Error (Telegram):", err.message);
            });

            telegramReq.write(data);
            telegramReq.end();
        } else {
            console.error("❌ Missing .env variables: TELEGRAM_BOT_TOKEN or MY_CHAT_ID");
        }

        // 4. Send response to frontend
        res.status(201).json(createdOffer);

    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOffer };

const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message, jobType } = req.body;
        if (!name || !email || !message || !jobType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updatedOffer = { name, email, message, jobType };
        const offerDoc = await Offer.findByIdAndUpdate(id, updatedOffer, { returnDocument: 'after' });
        if (!offerDoc) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.status(200).json(offerDoc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await Offer.findByIdAndDelete(id);
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer
};
