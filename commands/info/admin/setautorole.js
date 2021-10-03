const schema = require('../../../models/autorole');

module.exports = {
    name: 'setautorole',
    description: 'Enable Auto Role Module of a server',
    category: 'setup',
    aliases: ['sar'],
    run: async(client, message, args) => {
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.channel.send(`<:wrong:893330231954386984> Incorrect Usage.`)
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("<:wrong:893330231954386984> You don't have permission to use this command")
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                message.channel.send(`<:wrong:893330231954386984> Auto Role Module for this server is already seted. reset it and set it again`)
            } else {
                data = new schema({
                    Guild: message.guild.id,
                    Role: role.id,
                })
                await data.save()
                message.channel.send(`<:right:893330260295311360> | Auto Role for this server has been enabled`)
            }
        })
    }
}