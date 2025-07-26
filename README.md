// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ipn = require('ipn');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/webhook/paypal', (req, res) => {
  // 1. Validate IPN message with PayPal
  ipn.verify(req.body, { allow_sandbox: process.env.PAYPAL_SANDBOX === 'true' }, (err, msg) => {
    if (err) {
      console.error('IPN Verification failed:', err);
      return res.sendStatus(500);
    }
    if (msg === 'VERIFIED' && req.body.payment_status === 'Completed') {
      const payerEmail = req.body.payer_email;
      const txnId      = req.body.txn_id;
      const amount     = req.body.mc_gross;

      // 2. Call your business logic
      handleSponsor({
        source: 'PayPal',
        email: payerEmail,
        id: txnId,
        amount
      });
    }
    // Acknowledge receipt of IPN message
    res.sendStatus(200);
  });
});

// 3. Shared sponsor handler
async function handleSponsor({ source, email, id, amount }) {
  // 3a. Grant Discord role
  await axios.post(
    `https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${email}`, // or map email→userID
    { roles: [process.env.DISCORD_SPONSOR_ROLE_ID] },
    { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
  );

  // 3b. Send artifact link via email or DM
  // (Use your email-sending service or Discord DM endpoint)
  console.log(`Artifact delivered to ${email}: https://mybucket.s3/${id}.zip`);

  // 3c. Log entry
  await axios.post(process.env.LOGBOOK_WEBHOOK_URL, {
    embeds: [{
      title: `New Sponsor via ${source}`,
      description: `🪙 ${amount} ${source} pledge from ${email}\nTxn ID: ${id}`,
      timestamp: new Date().toISOString()
    }]
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log('PayPal IPN listener running');
});# Install dependencies
npm install express body-parser ipn dotenv axios# 🧿 MYTHOLOGY  
*A gallery of inspired artifacts from the Kyprian continuum.*

This private vault chronicles illustrations born from prophecy, parody, and mutation. Every image is more than art—it's a relic, a riffable echo of Kypria's mythic past and speculative future.

## 📜 What it holds:
- Visual scrolls from active campaigns  
- Fan-forged mutations and absurd riffs  
- Sponsor-tier exclusives tied to artifact lineage  
- Archival fragments once lost, now reinterpreted  

## 🛠️ What it serves:
- Embeds for Discord logbooks  
- Real-time artifact drops tied to monetization events  
- A riff-ready foundation for narrative remixing  

More than just a gallery—this is the visual armory.  
Every scroll is canon. Every commit is an omen.
