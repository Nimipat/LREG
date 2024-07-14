import { Socket } from "socket.io";

export {Server} from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173/",
    },
});

let onlineUser = []

const addUser = (userId, socketId)=>{
    const userExits = onlineUser.find(user => user.userId === userId);
    if (!userExits) {
        onlineUser.push({userId, socketId});
    }
};

const removeUser = (socketId)=>{
    onlineUser = onlineUser.filter(user=>user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find(user=>user.userId === userId);
};

io.on("connection", (Socket) => {
   Socket.on("newUser", (userId)=>{
    addUser(userId, Socket.id);
    console.log(onlineUser)
   });

Socket.on("sendMessage", ({receiverId, data}) => {
    const receiver = getUser(receiverId)
    io.to(receiver.socketId).emit("getMessage",data);
});

   Socket.on("disconnect",()=>{
    removeUser(Socket.id);
   })
});

io.listen("4000");