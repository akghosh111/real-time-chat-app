const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"], // Allow specific HTTP methods
    }
});

io.on("connection", socket => {
    console.log("connected");
    socket.emit("chat-message", "Hello World");
});
