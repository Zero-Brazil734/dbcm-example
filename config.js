const chalk = require("chalk")

module.exports = {
    token: "your token",
    dev: "Dev ID" || ["Dev ID", "Dev ID2"],
    prefix: "your prefix",
    logMessages: false,
    database: false,
    readyMsg: (client) => {
        return `${chalk.green("[")}${chalk.blue("READY")}${chalk.green("]")} "${client.user.tag}" has started to run at ${client.readyAt}`
    }
}