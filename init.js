const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(() => {
    console.log("Connection successful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "Rohan",
        to: "Sunil",
        msg: "Send me your resume",
        created_at: new Date()
    },
    {
        from: "Rohit",
        to: "Sohel",
        msg: "Lets Play",
        created_at: new Date()
    },
    {
        from: "Farhan",
        to: "Sujan",
        msg: "Lets Gooooo",
        created_at: new Date()
    },
    {
        from: "Saket",
        to: "Suraj",
        msg: "Hello There !!",
        created_at: new Date()
    },
    {
        from: "Tony",
        to: "Peter",
        msg: "Love you 3000",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Adam",
        msg: "Hello Cutie!!",
        created_at: new Date()
    },
]
Chat.insertMany(allChats);