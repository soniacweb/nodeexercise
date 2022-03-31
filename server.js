var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const messages = [
  { name: "sonia" },
  { name: "charlie" },
  { name: "richard", message: "whats up" },
];
app.use(express.static(__dirname));
app.use(bodyParser.json());
// get all messages
app.get("/messages", (req, res) => {
  res.send(messages);
});

// post a new message
app.post("/newmessage", (req, res) => {
  console.log(req.body);
  messages.push(req.body);
  io.emit("message", req.body);
  res.sendStatus(200);
});

io.on("connection", (socket) => console.log(socket, "user connected"));

var server = http.listen(3000, () => {
  console.log("server is listening on port", server.address().port);
});
