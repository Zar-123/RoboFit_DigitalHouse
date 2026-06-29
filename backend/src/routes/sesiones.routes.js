import { Router } from 'express';
import SesionController from '../controllers/Sesion.controller.js';

const router = Router();
const userId = 'user-123';

router.get(`/${userId}/sesiones`, (req, res) => {
  SesionController.getAll({ params: { userId } }, res);
});

router.get(`/${userId}/sesiones/:id`, (req, res) => {
  SesionController.getById(req, res);
});

router.post(`/${userId}/sesiones`, (req, res) => {
  SesionController.create({ params: { userId }, body: req.body }, res);
});

router.put(`/${userId}/sesiones/:id`, (req, res) => {
  SesionController.update(req, res);
});

router.delete(`/${userId}/sesiones/:id`, (req, res) => {
  SesionController.remove(req, res);
});

export default router;
