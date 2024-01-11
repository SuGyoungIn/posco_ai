import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: '*',
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
    nickname: null,
    position: generateRandomPosition(),
    animal: null,
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

  socket.on('chat message', (data) => {
    const character = characters.find((character) => character.id === data.id);
    if (character) {
      io.emit('message', {
        nickname: characters.nickname,
        message: data.message,
      });
    }
  });

  socket.on('pickAnimal', (data) => {
    const character = characters.find((character) => character.id === data.id);
    if (character) {
      character.nickname = data.data[0];
      character.animal = data.data[1];
      io.emit('characters', characters);
    }
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
