import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.listen(3001);

const characters = [];

const generateRandomPosition = () => {
  const min = -200;
  const max = 200;

  return [
    Math.floor(Math.random() * (max - min + 1)) + min,
    25,
    Math.floor(Math.random() * (max - min + 1)) + min,
  ];
};

io.on('connection', (socket) => {
  console.log('user connected');

  characters.push({
    id: socket.id,
    position: generateRandomPosition(),
  });

  socket.emit('hello');

  socket.emit('characters', characters);
  io.emit('characters', characters);

  socket.on('move', (position) => {
    const character = characters.find(
      (character) => character.id === socket.id
    );
    character.position = position;
    io.emit('characters', characters);
  });

  socket.on('chat message', (message) => {
    io.emit('message', {
      userId: socket.id,
      message: message,
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');

    characters.splice(
      characters.findIndex((character) => character.id === socket.id),
      1
    );

    io.emit('characters', characters);
  });
});
