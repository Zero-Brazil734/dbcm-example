const { dev } = require("../config")

exports.run = (client, message, args) => {
    if (Array.isArray(dev) && !dev.includes(message.author.id)) return 
    if (typeof dev === "string" && dev !== message.author.id) return

    let query = args[0]

    switch(query) {
    case "add":
        break
    case "remove":
        break
    case "resetAll":
        break
    case "get":
        break
    default:
        return message.reply(" Please write data you want to see. `cooldown <add/remove/resetAll/get>`")
    }

    //I will finish it later
}

exports.config = {
    name: "cooldown",
    aliases: ["cd", "cooltime", "ct"]
}