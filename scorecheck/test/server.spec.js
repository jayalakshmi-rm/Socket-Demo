const io = require('socket.io-client');
const should = require('should');

describe('Socket server test suite', () => {
  let client;
  beforeEach(() => {
    client = io.connect('http://localhost:3000');
  });

  afterEach(() => {
    client.disconnect();
  });

  it('on receiving event "connection", should emit event "hi" and send back client details', (done) => {
    client.on('hi', (data) => {
      data.should.be.an.Object();
      data.should.have.property('user-agent');
      done();
    });
  });

  it('on receiving event "getGames", should emit event "gameList" with a list of available games', (done) => {
    client.emit('getGames');
    client.on('gameList', (games) => {
      games.should.be.an.Object();
      games[0].should.have.property('matchId');
      games[0].should.have.property('details');
      done();
    });
  });

  it('on receiving event "joinGame", should emit event "joinedGame" and send back the joined game', (done) => {
    client.emit('joinGame', 1);
    client.on('joinedGame', (game) => {
      game.should.be.an.Object();
      game.should.have.property('matchId');
      game.should.have.property('details');
      done();
    });
  });

  it('on receiving event "joinGame", should emit event "newScore" with the live score data', (done) => {
    client.emit('joinGame', 1);
    client.on('newScore', (score) => {
      score.should.be.a.String();
      score.should.startWith('1');
      done();
    });
  });
});
