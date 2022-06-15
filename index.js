require('dotenv').config();

const Client = require("./discord/client.js");
const RolesGiverBot = require("./bots/roles-giver-bot.js");
const logger = require('./logger');
const discord = require('discord.js');
const slashCommandsLoader = require('./slash-commands-loader/slash-commands-loader.js');

const options = {
  intents : [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    discord.Intents.FLAGS.GUILD_MEMBERS
  ]
}

const client = new Client(
  process.env.DISCORD_CLIENT_TOKEN,
  logger,
  options
); 

slashCommandsLoader.loadCommands(
  process.env.DISCORD_CLIENT_TOKEN, 
  process.env.DISCORD_APP_ID,
  logger
);

client.addBot(RolesGiverBot);

client.start(); 
