import { Client, Intents, MessageEmbed, TextChannel } from 'discord.js';
import fs from 'fs';
import path from 'path';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
client.login(process.env.DISCORD_TOKEN);

async function assignRole(userId, roleId) {
  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  const member = await guild.members.fetch(userId);
  await member.roles.add(roleId, 'Blessed by the Sponsor Beacon');
}

async function sendArtifactEmbed(userId, tierKey, artifactDir) {
  const files = fs
    .readdirSync(artifactDir)
    .filter(f => /\.(png|jpe?g|gif)$/i.test(f));
  const chosen = files[Math.floor(Math.random() * files.length)];
  const url = `${process.env.CDN_URL}/${tierKey}/${chosen}`;
  
  const channel = await client.channels.fetch(process.env.FORGE_PAYMENTS_CHANNEL_ID);
  const embed = new MessageEmbed()
    .setTitle(`🔮 New relic: ${chosen}`)
    .setDescription(`<@${userId}> has unlocked a **${tierKey}** artifact`)
    .setImage(url)
    .setTimestamp()
    .setColor('#FFD700');

  await (channel).send({ embeds: [embed] });
  return url;
}

async function logPayment({ userId, tierKey, amount }) {
  const channel = await client.channels.fetch(process.env.FORGE_PAYMENTS_CHANNEL_ID);
  await (channel).send(
    `💰 <@${userId}> pledged **$${amount}** as a **${tierKey}** sponsor.`
  );
}

export { assignRole, sendArtifactEmbed, logPayment };