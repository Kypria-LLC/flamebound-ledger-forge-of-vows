import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import {
  assignRole,
  sendArtifactEmbed,
  logPayment
} from './utils/discordService.js';
import { sponsorTiers } from './tiers.js';

const app = express();
app.use(bodyParser.json());

async function verifyPayPal(req) {
  // Basic example: exchange webhook ID for verification
  const response = await fetch(
    `https://api-m.paypal.com/v1/notifications/verify-webhook-signature`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: JSON.stringify({
        auth_algo: req.headers['paypal-auth-algo'],
        cert_url: req.headers['paypal-cert-url'],
        transmission_id: req.headers['paypal-transmission-id'],
        transmission_sig: req.headers['paypal-transmission-sig'],
        transmission_time: req.headers['paypal-transmission-time'],
        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
        webhook_event: req.body
      })
    }
  );
  const json = await response.json();
  return json.verification_status === 'SUCCESS';
}

app.post('/paypal-webhook', async (req, res) => {
  try {
    if (!(await verifyPayPal(req))) {
      console.warn('⚠️ Invalid PayPal webhook signature');
      return res.sendStatus(400);
    }

    const event = req.body;
    if (event.event_type === 'PAYMENT.SALE.COMPLETED') {
      const custom = JSON.parse(event.resource.custom_id);
      const { discordId, tier } = custom;
      const tierConfig = sponsorTiers[tier];

      await assignRole(discordId, tierConfig.roleId);
      await sendArtifactEmbed(discordId, tier, tierConfig.artifactDir);
      await logPayment({
        userId: discordId,
        tierKey: tier,
        amount: event.resource.amount.total
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('🚨 Webhook handler error:', err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🔔 Sponsor Beacon listening on port ${PORT}`)
);