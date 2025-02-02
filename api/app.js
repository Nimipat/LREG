import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import usersRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


app.listen(5500, () =>{
    console.log("Server is running!");
})