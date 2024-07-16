const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);


const { Server } = require("socket.io");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));

const rooms = { name : {}}

app.get("/", (req, res) =>{
    if (rooms[req.body.room]!=null){
        return res.redirect("/");
    }
    res.render("index", {rooms: rooms});
});

app.post("/room", (req, res) => {
    rooms[req.body.room] = {users: {}};
    res.redirect(req.body.room);
})

app.get("/:room", (res, req) => {
    res.render("room", {roomName: req.params.room});
});

server.listen(3000);

/*const io = new Server(3000, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"], // Allow specific HTTP methods
    }
});
*/

const users = {}

io.on("connection", socket => {
    socket.on("new-user", username =>{
        users[socket.id] = username;
        socket.broadcast.emit("user-connected", username)
    })
    socket.on("send-chat-message", message =>{
        socket.broadcast.emit("chat-message", { message:message, username: users[socket.id]})
    })
    socket.on("disconnect", () =>{
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id];
    })
});


