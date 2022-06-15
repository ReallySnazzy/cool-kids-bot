const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = [
    new SlashCommandBuilder()
        .setName("showroles")
        .setDescription("Displays the role selection dialog"),
];