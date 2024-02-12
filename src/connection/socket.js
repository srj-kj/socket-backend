import { Server } from "socket.io";
let io
const connectSocket = (server) => {
     io = new Server(server, {
        path: "/api/socket.io/",
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    return io;
}

export {io,connectSocket};
