import express from 'express';
import ExpenseTypesModel from './expense.types.model.js';

const router = express.Router();
const model = new ExpenseTypesModel();

// Crear tipo de gasto
router.post('/expense-types', async (req, res) => {
  try {
    const expenseType = await model.create(req.body);
    res.json({ success: true, code: 'ITEM_CREATED', details: expenseType });
  } catch (error) {
    res.status(500).json({ success: false, code: 'ERROR_INTERNAL', message: error.message });
  }
});

// Listar tipos de gasto
router.get('/expense-types', async (req, res) => {
  try {
    const expenseTypes = await model.findAll();
    res.json({ success: true, code: 'REQUEST_SUCCESSFUL', details: expenseTypes });
  } catch (error) {
    res.status(500).json({ success: false, code: 'ERROR_INTERNAL', message: error.message });
  }
});

// Consultar por ID
router.get('/expense-types/:id', async (req, res) => {
  try {
    const expenseType = await model.findById(req.params.id);
    if (!expenseType) {
      return res.status(404).json({ success: false, code: 'ITEM_NOT_FOUND', message: 'Expense type not found' });
    }
    res.json({ success: true, code: 'REQUEST_SUCCESSFUL', details: expenseType });
  } catch (error) {
    res.status(500).json({ success: false, code: 'ERROR_INTERNAL', message: error.message });
  }
});

// Actualizar tipo de gasto
router.put('/expense-types/:id', async (req, res) => {
  try {
    const expenseType = await model.update(req.params.id, req.body);
    res.json({ success: true, code: 'ITEM_UPDATED', details: expenseType });
  } catch (error) {
    res.status(500).json({ success: false, code: 'ERROR_INTERNAL', message: error.message });
  }
});

// Eliminar tipo de gasto
router.delete('/expense-types/:id', async (req, res) => {
  try {
    await model.delete(req.params.id);
    res.json({ success: true, code: 'ITEM_DELETED' });
  } catch (error) {
    res.status(500).json({ success: false, code: 'ERROR_INTERNAL', message: error.message });
  }
});

export default router;
