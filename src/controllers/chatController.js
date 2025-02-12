const Message = require('../models/Message');

const getChatHistory = async () => {
    return await Message.find().sort({ timestamp: 1 }).limit(10);
};

const saveMessage = async (user, message) => {
    const newMessage = new Message({ user, message });
    return await newMessage.save();
};

module.exports = { getChatHistory, saveMessage };
