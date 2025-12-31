const express = require('express');
const controller = require('../controllers/eventoController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(auth);

router.get('/', controller.listarEventos);
router.post('/', controller.adicionarEvento);
router.delete('/:id', controller.deletarEvento);
router.put('/:id/publicar', controller.publicarEvento);





module.exports = router;
