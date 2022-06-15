module.exports.guild = async function(client) {
    let guilds = await client.guilds.fetch();
    let fetchableGuild = guilds.values().next().value; // There's only one guild this bot is a member of
    let guild = await client.guilds.fetch(fetchableGuild.id);
    return guild;
};

module.exports.channels = async function(client) {
    let guild = await this.guild(client);
    let channels = await guild.channels.fetch();
    return channels;
};

module.exports.channelByName = async function(client, channelName) {
    let channels = await this.channels(client);
    let channel = channels.find(c => c.name == channelName);
    return channel;
};

module.exports.roles = async function(client) {
    let guild = await this.guild(client);
    let roles = await guild.roles.fetch();
    return roles;
};

module.exports.roleByName = async function(client, roleName) {
    let roles = await this.roles(client);
    let role = roles.find(r => r.name == roleName);
    return role;
};