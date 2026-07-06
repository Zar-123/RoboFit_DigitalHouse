const API_ROOT = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

function getWorkoutApiBase(sesionId) {
  if (!sesionId) {
    throw new Error('sesionId is required');
  }

  return `${API_ROOT}/api/sesiones/${encodeURIComponent(sesionId)}/workouts`;
}

async function parseResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || result.error || 'Request failed');
  }

  return result.data ?? result;
}

async function getAll(sesionId) {
  const response = await fetch(getWorkoutApiBase(sesionId), { method: 'GET' });
  return parseResponse(response);
}

async function getById(sesionId, id) {
  const response = await fetch(`${getWorkoutApiBase(sesionId)}/${id}`, { method: 'GET' });
  return parseResponse(response);
}

async function create(sesionId, data) {
  const response = await fetch(getWorkoutApiBase(sesionId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

async function update(sesionId, id, data) {
  const response = await fetch(`${getWorkoutApiBase(sesionId)}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

async function remove(sesionId, id) {
  const response = await fetch(`${getWorkoutApiBase(sesionId)}/${id}`, { method: 'DELETE' });
  return parseResponse(response);
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
