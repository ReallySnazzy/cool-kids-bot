const BaseDiscordBot = require("./base-discord-bot.js");
const easyDiscord = require("../easy-discord.js");
const discord = require("discord.js");
const serverConstants = require('../server-constants.js');

const MESSAGE_TEXT = 'Select which roles you would like to have';
const ROLES_CHANNEL_NAME = 'bot-dev-testing-area';

const INTERACTION_IDS = {
    GIVE_ROLE_MONEY: 'give-role-money',
    GIVE_ROLE_GAMING: 'give-role-gaming',
    GIVE_ROLE_PROGRAMMING: 'give-role-programming',
    GIVE_ROLE_SELF_IMPROVEMENT: 'give-role-self-improvement',
    GIVE_ROLE_BOOK_CLUB: 'give-role-book-club',
    GIVE_ROLE_HEALTHY: 'give-role-healthy',
    GIVE_ROLE_BOT_DEV: 'give-role-bot-dev'
};

const INTERACTION_ROLE_MAPPING = {
    [INTERACTION_IDS.GIVE_ROLE_MONEY]: serverConstants.ROLE_NAMES.MONEY_MAKER,
    [INTERACTION_IDS.GIVE_ROLE_GAMING]: serverConstants.ROLE_NAMES.GAMER,
    [INTERACTION_IDS.GIVE_ROLE_PROGRAMMING]: serverConstants.ROLE_NAMES.PROGRAMMER,
    [INTERACTION_IDS.GIVE_ROLE_SELF_IMPROVEMENT]: serverConstants.ROLE_NAMES.SELF_IMPROVER,
    [INTERACTION_IDS.GIVE_ROLE_BOOK_CLUB]: serverConstants.ROLE_NAMES.BOOK_WORM,
    [INTERACTION_IDS.GIVE_ROLE_HEALTHY]: serverConstants.ROLE_NAMES.HEALTH_CONSCIOUS,
    [INTERACTION_IDS.GIVE_ROLE_BOT_DEV]: serverConstants.ROLE_NAMES.BOT_DEVELOPER,
};

class RolesGiverBot extends BaseDiscordBot {
    constructor(client, logger) {
        super(client, logger);
        this.client = client;
        this.logger = logger;
    }
    
    name() {
        return "RolesGiver";
    }

    async onReady() {

    }

    async onInteractionCreate(interaction) {
        if (interaction.isButton) {
            await this.buttonInteraction(interaction);
        }
        if (interaction.isCommand) {
            await this.commandInteraction(interaction);
        }
    }

    async buttonInteraction(interaction) {
        if (INTERACTION_ROLE_MAPPING[interaction.customId] != null) {
            let roleName = INTERACTION_ROLE_MAPPING[interaction.customId];
            let role = await easyDiscord.roleByName(this.client, roleName);
            if (interaction.member.roles.cache.has(role.id)) {
                this.logger.log('info', `Giving role ${roleName} to ${interaction.user.username}`);
                await interaction.member.roles.remove(role);
                await interaction.reply({ content: 'Removed role ' + roleName, ephemeral: true });
            } else {
                this.logger.log('info', `Removing role ${roleName} from ${interaction.user.username}`);
                await interaction.member.roles.add(role);
                await interaction.reply({ content: 'Gave role ' + roleName, ephemeral: true });
            }
        }
    }

    async commandInteraction(interaction) {
        if (interaction.commandName != 'showroles') {
            return;
        }
        if (interaction.user.id == serverConstants.MANAGER_ID) {
            // Not awaiting intentionally to move onto the roles selection dialog
            interaction.reply(
                {
                    content: 'Showing roles dialog',
                    ephemeral: true
                }
            );
            await this.showRolesSelection(interaction.channel);
        } else {
            await interaction.reply(
                {
                    content: 'You do not have permission to use this command',
                    ephemeral: true
                }
            );
        }
    } 

    async showRolesSelection(channel) {
        const row1 = new discord.MessageActionRow()
            .addComponents( 
                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_MONEY)
                    .setLabel('Money')
                    .setEmoji('💵')
                    .setStyle('PRIMARY'),

                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_GAMING)
                    .setLabel('Gaming')
                    .setEmoji('🕹️')
                    .setStyle('PRIMARY'),

                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_PROGRAMMING)
                    .setLabel('Programming')
                    .setEmoji('💻')
                    .setStyle('PRIMARY'),

                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_SELF_IMPROVEMENT)
                    .setLabel('Self Improvement')
                    .setEmoji('💇‍♂️')
                    .setStyle('PRIMARY'),
            );

        const row2 = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_BOOK_CLUB)
                    .setLabel('Book Club')
                    .setEmoji('📕')
                    .setStyle('PRIMARY'),

                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_HEALTHY)
                    .setLabel('Healthy')
                    .setEmoji('🥕')
                    .setStyle('PRIMARY'),

                new discord.MessageButton()
                    .setCustomId(INTERACTION_IDS.GIVE_ROLE_BOT_DEV)
                    .setLabel('Bot Dev')
                    .setEmoji('🤖')
                    .setStyle('PRIMARY'),
            );

        await channel.send({
            content: MESSAGE_TEXT,
            components: [row1, row2]
        });
    }
}

module.exports = RolesGiverBot;