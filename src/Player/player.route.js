const Koa = require('koa');
const Router = require('koa-router');
const { getAllPlayers, addPlayer, modifyPlayer, removePlayer, getPlayer } = require('./player.service');

const router = new Router();

router.get('/players', async (ctx, next) => {
  const players = await getAllPlayers();
  ctx.body = players;
})

router.post('/player', async (ctx, next) => {
  const playerToAdd = await addPlayer(ctx.request.body);
  ctx.body = playerToAdd;
})

router.get('/player/:id', async (ctx, next) => {
  const player = await getPlayer(ctx.params.id);
  ctx.body = player;
})

router.patch('/player', async (ctx, next) => {
  const wasUpdated = await modifyPlayer(ctx.request.body);
  ctx.body = wasUpdated;
})

router.delete('/player/:id', (ctx, next) => {
  removePlayer(ctx.params.id);
})

module.exports = router;