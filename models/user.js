const { model, Schema } = require("mongoose")

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    point: {
        type: Number,
        required: false,
        default: 0
    }
}, { versionKey: false })

module.exports = model("user", userSchema)