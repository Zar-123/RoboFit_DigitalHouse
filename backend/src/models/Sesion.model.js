import { supabase } from '../supabase.js';

class SesionModel {
  static async getAll(userId) {
    try {
      const { data, error } = await supabase
        .from('Sesion')
        .select('*')
        .eq('userId', userId);

      if (error) {
        throw error;
      }

      return data ?? [];
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('Sesion')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    try {
      const { data: newSesion, error } = await supabase
        .from('Sesion')
        .insert({
          userId: data.userId,
          nombre: data.nombre,
          deporte: data.deporte,
          duracionMinutos: data.duracionMinutos,
          nivel: data.nivel,
          fecha: data.fecha,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return newSesion;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const { data: updatedSesion, error } = await supabase
        .from('Sesion')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return updatedSesion;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('Sesion')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default SesionModel;
