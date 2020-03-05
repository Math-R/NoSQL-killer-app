const Koa = require('koa');
const Router = require('koa-router');
const { getAllPlayers, addPlayer, modifyPlayer, removePlayer, getPlayer } = require('./player.service');

const router = new Router();

router.get('/player', (ctx, next) => {
  getAllPlayers()
    .then((players) => ctx.json({ players: players }))
    .catch(error => ctx.app.emit('error', error, ctx));
});

router.post('/player', (ctx, next) => {
  const playerToAdd = ctx.body;
  addPlayer(playerToAdd)
    .then((playerId) => ctx.json({ playerIdAdded: playerId }))
    .catch(err => ctx.status(500).send(err));
});

router.get('/player/:id', (ctx, next) => {
  const id = ctx.params['id'];
  getPlayer(id)
    .then((player) => ctx.json({ player: player }))
    .catch(err => ctx.status(500).send(err));
});


router.patch('/player', (ctx, next) => {
  const playerToUpdate = ctx.body;
  modifyPlayer(playerToUpdate)
    .then(wasUpdated => ctx.json(wasUpdated))
    .catch(err => ctx.status(500).send(err));
});

router.delete('/player/:id', (ctx, next) => {
  const id = ctx.params['id'];
  removePlayer(id)
    .then(wasDeleted => ctx.json(wasDeleted))
    .catch(err => ctx.status(500).send(err));
});

module.exports = router;