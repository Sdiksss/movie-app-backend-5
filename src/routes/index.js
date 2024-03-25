const express = require('express');
const genreRouter = require('./genre.router');
const directorRouter = require('./director.router');
const movieRouter = require('./movie.router');
const actorRouter = require('./actor.router');
const router = express.Router();

// colocar las rutas aquí

router.use(genreRouter)
router.use(directorRouter)
router.use(movieRouter)
router.use(actorRouter)


module.exports = router;