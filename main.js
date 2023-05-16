
import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import fs from 'fs';
import { generateFilename, generateRoomId } from "./functions.js"

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = 3000 || env.PORT

io.on('connection', (socket) => {

  var user = {
    id: socket.id,
    roomId: generateRoomId(),
    auth: socket.handshake.query.authorization
  };

  socket.join(user.roomId);
  io.to(user.id).emit('on_connected', {sid: user.id, roomId: user.roomId});

  socket.on('join_room', (data)=> {
    user.roomId = data.roomId;
    socket.join(user.roomId);
    io.to(user.id).emit('on_changed_room', {
      user: user, roomId: data.roomId
    });
  });

  socket.on('file', (data) => {
    // const fileData = Buffer.from(data.data);
    // fs.writeFile(`uploads/${generateFilename()}.${data.fileType}`, fileData, function (err) {
    //   if (err) throw err;
    //   // uploaded
    // });
    io.in(user.roomId).emit('on_upload_file', {
      user: user, file: {
        data: data.data,
        name: data.name,
        fileType: data.fileType
      }
    });

  });
});

httpServer.listen(PORT, () => {
  console.log('Server listening on *:3000');
});

// Make a script to recieve file via socket io