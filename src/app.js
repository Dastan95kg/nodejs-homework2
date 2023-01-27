import express from "express";
import http from "http";
import usersRoutes from "./routes/users.js";

const port = 3000;
const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

// Default Url
app.use("/", (req, res) => {
  res.send("node app works");
});

const server = http.createServer(app);
server.listen(port);
