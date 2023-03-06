const {
  Client,
  Collection,
  Partials,
  GatewayIntentBits,
} = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const color = require('colors');
dotenv.config();

// Initialization
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
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
let commandPath = "./commands",
  interactionPath = "./interactions",
  eventPath = "./events";

// Command Handler
console.log(`${color.bold.green(`[GLOBAL COMMANDS]`)}` + `Starter refreshing application commands...`.yellow);

let commandCount = 0;
for (const file of fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"))) {
  const command = require(`${commandPath}/${file}`);
  client.commands.set(command.data.name, command);
  commandCount++;
}

console.log(`${color.bold.green(`[GLOBAL COMMANDS]`)}` + `[${commandPath.length}]`.cyan + ` successfully loaded`.yellow)
    
// Interaction Handler
for (const file of fs
  .readdirSync(interactionPath)
  .filter((file) => file.endsWith(".js"))) {
  const interaction = require(`${interactionPath}/${file}`);
  client.interactions.set(interaction.data.id, interaction);
}

// Event Handler
console.log(`${color.bold.green(`[EVENTS]`)}` + ` Started refreshing application events...`.yellow)

let eventCount = 0;
for (const file of fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"))) {
  const event = require(`${eventPath}/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  eventCount++;
}
console.log(`${color.bold.green(`[EVENTS]`)}` + `[${eventPath.length}] `.cyan + `in `.yellow + `${eventCount} `.magenta + `Successfully loaded!`.yellow)

// Login
client.login(process.env.TOKEN);


