const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"], // Allow specific HTTP methods
    }
});

const users = {}

io.on("connection", socket => {
    socket.on("new-user", username =>{
        users[socket.id] = username;
        socket.broadcast.emit("user-connected", username)
    })
    socket.on("send-chat-message", message =>{
        socket.broadcast.emit("chat-message", message)
    })
});
