const Discord = require("discord.js")
const config = require("./config.js")
const dbcm = require("dbcm")
const client = new dbcm.Client({
    dev: config.dev,
    autoReconnect: true,
    locale: "en-US"
})

client.registerCommands(require.resolve("./commands"), { createSample: false })

client.database.connect("mongodb://localhost/example", { useFindAndModify: false })
client.database.registerModels(require.resolve("./models"))

client.on("ready", () => {
    console.log(config.readyMsg)
})

client.on("message", async message => {
    if(message.system || message.author.bot || message.channel.type === "dm") return

    if(config.logMessages === true) console.log(`[MESSAGE] [Guild: ${message.guild.name}] [Channel: ${message.channel.name}] [Author: ${message.author.tag}] - ${message.content}`)

    client.database.models.get("user").findById(message.author.id, (err, res) => {
        if(err) throw new Error(err)

        if(res)
    })

    if(!message.content.startsWith(config.prefix)) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    client.runCommand(command, message, args).catch(err => { throw new Error(err) })
})

client.login(config.token)

process.on("uncaughtException", error => {
    console.error(error)
})

