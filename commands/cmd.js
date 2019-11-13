const Discord = require("discord.js")
const COR = "#a6ffed"
const db = require("mongoose").connection
const fs = require("fs")
const mongoose = require("mongoose")
const os = require("os")
const util = require("util")
const dbcm = require("dbcm")
const utils = new dbcm.Utils({ lang: "ko-KR" })
const config = require("../config.js")
const child = require("child_process")

exports.run = async (client, message, args) => {
    if (Array.isArray(config.dev) && !config.dev.includes(message.author.id)) return
    if (typeof config.dev === "string" && config.dev !== message.author.id) return

    let msg = message
    let cmd = args.join(" ")

    new Promise(resolve => resolve(eval(cmd)))
        .then(async res => {
            let code = res

            if (typeof code !== "string") code = util.inspect(code, { depth: 0 })

            let evalEmbed = new Discord.RichEmbed()
                .setAuthor("Eval", message.author.avatarURL)
                .setColor(COR)
                .addField("⌨Input:", `\`\`\`js\n${String(cmd).length > 1024 ? String(cmd).substring(0, 983) + "\n//And much more..." : cmd}\n\`\`\``)
                .addField("💻Output:",  `\`\`\`js\n${String(code).length > 1024 ? String(code).substring(0, 983) + "\n//And much more..." : code}\n\`\`\``)
            message.channel.send(evalEmbed)
        }).catch(Ecmd => {
            let Eembed = new Discord.RichEmbed()
                .setTitle("Eval Error:")
                .setColor(COR)
                .setDescription(`\`\`\`${Ecmd}\`\`\``)
            message.channel.send(Eembed)
        })
}
exports.config = {
    name: "cmd",
    aliases: ["eval", "script", "js"]
}