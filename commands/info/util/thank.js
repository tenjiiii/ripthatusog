
const thanksSchema = require('../../../models/thanksSchema')

module.exports = {
    name: "thank",
    aliases: ['ty', 'thanks', 'tysm'],
    run: async(client, message, args) => {

    const target = message.mentions.users.first()
    if (!target) {
      message.reply('Please specify someone to thank')
      return
    }

    const { guild } = message
    const guildId = guild.id
    const targetId = target.id
    const authorId = message.author.id
    const now = new Date()

    if (targetId === authorId) {
      message.reply('You cannot thank yourself')
      return
    }

    const authorData = await thanksSchema.findOne({
      userId: authorId,
      guildId,
    })

    if (authorData && authorData.lastGave) {
      const then = new Date(authorData.lastGave)

      const diff = now.getTime() - then.getTime()
      const diffHours = Math.round(diff / (1000 * 60 * 60))

      const hours = 24
      if (diffHours <= hours) {
        message.reply(
          `You have already thanked someone within the last ${hours} hours.`
        )
        return
      }
    }

    // Update the "lastGave" property for the command sender
    await thanksSchema.findOneAndUpdate(
      {
        userId: authorId,
        guildId,
      },
      {
        userId: authorId,
        guildId,
        lastGave: now,
      },
      {
        upsert: true,
      }
    )

    // Increase how many thanks the target user has had
    const result = await thanksSchema.findOneAndUpdate(
      {
        userId: targetId,
        guildId,
      },
      {
        userId: targetId,
        guildId,
        $inc: {
          received: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    const amount = result.received
    message.reply(
      `You have thanked <@${targetId}>! They now have ${amount} thanks.`
    )
  }
}
