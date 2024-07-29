const experss = require("express");
const app = experss();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const { ADDRGETNETWORKPARAMS } = require("dns");
const experssError = require("./expressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(experss.static(path.join (__dirname, "public")));
app.use(experss.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(() => {console.log("Connection successful")
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
});

//New route
app.get("/chats/new", (req, res) => {
    throw new experssError(404, "Page not Found");
    res.render("new.ejs");
});

//create route
app.post("/chats", (req,res) => {
    let {from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    newChat
        .save()
        .then(res => {
            console.log("Chat was saved");
        }).catch(err => {
            console.log(err);
        });
    res.redirect("/chats");
})

//show route
app.get("/chats/:id", async(req, res,next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.js", {chat});
});


//edit route
app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//update route
app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let { msg: newMsg } = req.body;
    console.log(newMsg);
    let updatedchat = await Chat.findByIdAndUpdate(
    id, 
    {msg: newMsg}, 
    {runValidators: true, new: true}
    );

    console.log(updatedchat);
    res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});
app.get("/", (req, res) => {
    res.send("Response is working");
});

//error handling middleware
app.use((err, req, res, next) => {
    let { status  = 500, message = "Some error occured"} = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});