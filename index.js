const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const color = require('colors');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    32767,
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
  ],
});

// Collections
client.commands = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();

// Paths
const commandPath = path.join(__dirname, 'commands');
const interactionPath = path.join(__dirname, 'interactions');
const eventPath = path.join(__dirname, 'events');

// Command Handler
console.log(`${color.bold.green('[GLOBAL COMMANDS]')} Started refreshing application commands...`.yellow);

let commandCount = 0;
fs.readdirSync(commandPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    try {
      const command = require(path.join(commandPath, file));
      if (command.data && command.data.name) {
        client.commands.set(command.data.name, command);
        commandCount++;
        console.log(`Loaded command: ${command.data.name}`);
      } else {
        console.error(`Command file ${file} does not export a valid command object.`);
      }
    } catch (error) {
      console.error(`Failed to load command ${file}:`, error);
    }
  });

console.log(`${color.bold.green('[GLOBAL COMMANDS]')} [${commandCount}] commands successfully loaded.`.yellow);

// Interaction Handler
console.log(`${color.bold.green('[INTERACTIONS]')} Started refreshing interactions...`.yellow);

let interactionCount = 0;
fs.readdirSync(interactionPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    try {
      const interaction = require(path.join(interactionPath, file));
      if (interaction.data && interaction.data.id) {
        client.interactions.set(interaction.data.id, interaction);
        interactionCount++;
        console.log(`Loaded interaction: ${interaction.data.id}`);
      } else {
        console.error(`Interaction file ${file} does not export a valid interaction object.`);
      }
    } catch (error) {
      console.error(`Failed to load interaction ${file}:`, error);
    }
  });

console.log(`${color.bold.green('[INTERACTIONS]')} [${interactionCount}] interactions successfully loaded.`.yellow);

// Event Handler
console.log(`${color.bold.green('[EVENTS]')} Started refreshing application events...`.yellow);

let eventCount = 0;
fs.readdirSync(eventPath)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    try {
      const event = require(path.join(eventPath, file));
      if (event.name) {
        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
        eventCount++;
        console.log(`Loaded event: ${event.name}`);
      } else {
        console.error(`Event file ${file} does not export a valid event object.`);
      }
    } catch (error) {
      console.error(`Failed to load event ${file}:`, error);
    }
  });

console.log(`${color.bold.green('[EVENTS]')} [${eventCount}] events successfully loaded.`.yellow);

// Login
client.login(process.env.TOKEN_STUDY);
