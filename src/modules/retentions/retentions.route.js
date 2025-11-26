import express from 'express';
import RetentionsModel from './retentions.model.js';

const router = express.Router();
const model = new RetentionsModel();

// Crear retención
router.post('/retentions', async (req, res) => {
  try {
    const retention = await model.create(req.body);
    res.json({ success: true, code: 'ITEM_CREATED', details: retention });
  } catch (error) {
    res.status(500).json({ success: false, code: 'ERROR_INTERNAL', message: error.message });
  }
});

// Listar retenciones
router.get('/retentions', async (req, res) => {
  const retentions = await model.findAll();
  res.json(retentions);
});

// Consultar por código
router.get('/retentions/:code', async (req, res) => {
  const retention = await model.findByCode(req.params.code);
  res.json(retention);
});

// Actualizar
router.put('/retentions/:code', async (req, res) => {
  const retention = await model.update(req.params.code, req.body);
  res.json(retention);
});

// Eliminar
router.delete('/retentions/:code', async (req, res) => {
  await model.delete(req.params.code);
  res.json({ success: true, code: 'ITEM_DELETED' });
});

export default router;
