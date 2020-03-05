const express = require('express');
const router = express.Router();
const {getAllPlayers, addPlayer, modifyPlayer, removePlayer, getPlayer} = require('./player.service');

router.get('/', (req, res) => {
  res.json({api: '/players'})
});

router.get('/player', (req, res) => {
  getAllPlayers()
    .then((players) => res.json({players: players}))
    .catch(err => res.status(500).send(err));
});

router.post('/player', (req, res) => {
  const playerToAdd = req.body;
  addPlayer(playerToAdd)
    .then((playerId) => res.json({playerIdAdded: playerId}))
    .catch(err => res.status(500).send(err));
});

router.get('/player/:id', (req, res) => {
  const id = req.params['id'];
  getPlayer(id)
    .then((player) => res.json({player: player}))
    .catch(err => res.status(500).send(err));
});


router.patch('/player', (req, res) => {
  const playerToUpdate = req.body;
  modifyPlayer(playerToUpdate)
    .then(wasUpdated => res.json(wasUpdated))
    .catch(err => res.status(500).send(err));
});

router.delete('/player/:id', (req, res) => {
  const id = req.params['id'];
  removePlayer(id)
    .then(wasDeleted => res.json(wasDeleted))
    .catch(err => res.status(500).send(err));
});

module.exports = router;