const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model("todo", todoSchema);

module.exports = { Todo }