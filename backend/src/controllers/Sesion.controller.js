import SesionModel from '../models/Sesion.model.js';

class SesionController {
  static async getAll(req, res) {
    try {
      const { userId } = req.params;
      const list = await SesionModel.getAll(userId);
      return res.status(200).json({ success: true, data: list, count: list.length });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const item = await SesionModel.getById(id);
      if (!item) return res.status(404).json({ success: false, error: 'Sesion not found' });
      return res.status(200).json({ success: true, data: item });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { userId } = req.params;
      const { nombre, deporte, duracionMinutos, nivel, fecha } = req.body;

      if (!nombre || !deporte || duracionMinutos === undefined || !nivel || !fecha) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const newItem = await SesionModel.create({ userId, nombre, deporte, duracionMinutos, nivel, fecha });
      return res.status(201).json({ success: true, message: 'Sesion created', data: newItem });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const item = await SesionModel.getById(id);
      if (!item) return res.status(404).json({ success: false, error: 'Sesion not found' });

      const updated = await SesionModel.update(id, updates);
      return res.status(200).json({ success: true, message: 'Sesion updated', data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  static async remove(req, res) {
    try {
      const { id } = req.params;
      const item = await SesionModel.getById(id);
      if (!item) return res.status(404).json({ success: false, error: 'Sesion not found' });

      const deleted = await SesionModel.delete(id);
      if (!deleted) return res.status(500).json({ success: false, error: 'Failed to delete sesion' });

      return res.status(200).json({ success: true, message: 'Sesion deleted' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}

export default SesionController;
