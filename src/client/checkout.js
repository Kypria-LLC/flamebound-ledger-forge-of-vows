<div id="paypal-button-container"></div>
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID"></script>
<script type="module">
  import { sponsorTiers } from '../tiers.js';

  const tierKey = 'silver';             // dynamically set via your UI
  const discordId = '1234567890123456'; // capture the user’s Discord ID

  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: { value: sponsorTiers[tierKey].price.toString() },
          custom_id: JSON.stringify({ discordId, tier: tierKey })
        }]
      });
    },
    onApprove: (data, actions) => actions.order.capture()
      .then(details => alert('Blessing incoming, ' + details.payer.name.given_name))
  }).render('#paypal-button-container');
</script>