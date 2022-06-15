const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const slashCommandDescriptions = require('./slash-command-descriptions.js');
const serverConstants = require('../server-constants.js');

module.exports.loadCommands = function(token, applicationId, logger) {
    let commandsJson = slashCommandDescriptions.map(c => c.toJSON());
    const rest = new REST({ version: '9' }).setToken(token);
    rest.put(Routes.applicationGuildCommands(applicationId, serverConstants.GUILD_ID), { body: commandsJson })
        .then(() => logger.log('info', 'Successfully registered application commands.'))
        .catch((e) => logger.log('warn', e.message));
}