// In-memory sesiones model (mock)
const sesiones = [];

class SesionModel {
  static getAll(userId) {
    return sesiones.filter(s => s.userId === userId);
  }

  static getById(id) {
    return sesiones.find(s => s.id === id);
  }

  static create(data) {
    const newSesion = {
      id: `ses-${Date.now()}`,
      userId: data.userId,
      nombre: data.nombre,
      deporte: data.deporte,
      duracionMinutos: data.duracionMinutos,
      nivel: data.nivel,
      fecha: data.fecha,
    };
    sesiones.push(newSesion);
    return newSesion;
  }

  static update(id, data) {
    const index = sesiones.findIndex(s => s.id === id);
    if (index === -1) return null;

    const updated = {
      ...sesiones[index],
      ...data,
      id: sesiones[index].id,
      userId: sesiones[index].userId,
    };

    sesiones[index] = updated;
    return updated;
  }

  static delete(id) {
    const index = sesiones.findIndex(s => s.id === id);
    if (index === -1) return false;
    sesiones.splice(index, 1);
    return true;
  }
}

export default SesionModel;
