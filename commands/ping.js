exports.run = async (client, message, args) => {
    let msg = await message.channel.send("calculating...")

    msg.edit(`API: \`\`${client.ping}\`\`ms\nMessage: \`\`${msg.createdTimestamp - message.createdTimestamp}\`\`ms`)
}

exports.config = {
    name: "ping",
    aliases: []
}