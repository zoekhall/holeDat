import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

// type User = {
//   id: string;
//   name: string;
//   photo: string;
// };

const socket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:8080',
    },
    pingTimeout: 60000,
  });

  io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.off('setup', (userData) => {
      console.log('user disconnected');
      socket.leave(userData.id);
    });
  });
};

export default socket;
