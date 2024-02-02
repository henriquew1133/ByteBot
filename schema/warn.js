const mongoose = require("mongoose")

const WarnModel = new mongoose.Schema({
    userId: String,
    moderatorId: String,
    reason: String,
    attachments: [String],
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Warn', WarnModel)