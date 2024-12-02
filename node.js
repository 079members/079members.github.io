
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

// Replace with your Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1302684161852702730/YiE1EIC9F0U5ayDfXEdhSi4H1tiNilrSysfPTpFRJ6BEZ5jdia5QwHaYbf4oSlj8zgvp';

app.use(express.json());

app.post('/log-ip', async (req, res) => {
    const { ip } = req.body;
    if (!ip) {
        return res.status(400).send('IP address missing.');
    }

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `New IP logged: ${ip}`
            })
        });
        res.send('IP logged successfully.');
    } catch (error) {
        console.error('Error sending to Discord:', error);
        res.status(500).send('Error logging IP.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
