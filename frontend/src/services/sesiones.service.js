const API_BASE = '/api/user-123/sesiones';

async function parseResponse(response) {
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(result.message || result.error || 'Request failed');
  }

  return result.data ?? result;
}

async function getAll() {
  const response = await fetch(API_BASE, { method: 'GET' });
  return parseResponse(response);
}

async function getById(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: 'GET' });
  return parseResponse(response);
}

async function create(data) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

async function update(id, data) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

async function remove(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  return parseResponse(response);
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
