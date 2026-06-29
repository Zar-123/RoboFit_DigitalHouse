# RoboFit

> 🏋️‍♂️ RoboFit es una app fullstack para administrar `Workout Logs` y `Sesiones`.

---

## 📌 Resumen del proyecto

- Backend: Node + Express
- Frontend: Vite + React
- Estructura actual:
  - `backend/`: servidor API, modelos mock, rutas, controladores
  - `frontend/`: aplicación React y service layer
- API proxy configurado desde Vite hacia `http://localhost:3000`

---

## 🧱 Arquitectura

### Backend

- `backend/index.js`
- `backend/src/routes/index.routes.js`
- `backend/src/routes/workouts.routes.js`
- `backend/src/routes/sesiones.routes.js`
- `backend/src/controllers/WorkoutLog.controller.js`
- `backend/src/controllers/Sesion.controller.js`
- `backend/src/models/WorkoutLog.model.js`
- `backend/src/models/Sesion.model.js`

### Frontend

- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/services/workoutLogs.service.js`
- `frontend/src/services/sesiones.service.js`
- `frontend/src/components/WorkoutLogsForm.jsx`
- `frontend/src/components/WorkoutLogsList.jsx`
- `frontend/src/components/SesionForm.jsx`
- `frontend/src/components/SesionList.jsx`

---

## 🚀 Endpoints principales

### Workout Logs

- `GET /api/user-123/workouts`
- `GET /api/user-123/workouts/:id`
- `POST /api/user-123/workouts`
- `PUT /api/user-123/workouts/:id`
- `DELETE /api/user-123/workouts/:id`

### Sesiones

- `GET /api/user-123/sesiones`
- `GET /api/user-123/sesiones/:id`
- `POST /api/user-123/sesiones`
- `PUT /api/user-123/sesiones/:id`
- `DELETE /api/user-123/sesiones/:id`

---

## 🧾 Formato de respuesta de la API

Todas las rutas usan el mismo envoltorio JSON:

```json
{
  "success": true,
  "data": {...}
}
```

o

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## ▶️ Cómo ejecutar

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Estado actual

- Backend separado en `backend/`
- Frontend separado en `frontend/`
- Servicio CRUD de `workoutLogs` funcional
- Servicio CRUD de `sesiones` funcional
- UI básica con `WorkoutLogsForm`, `WorkoutLogsList`, `SesionForm` y `SesionList`

---

## ⚠️ Pendientes y mejoras

- [ ] Validación de usuario dinámico en rutas (actualmente `user-123` hardcodeado)
- [ ] Agregar autenticación/autorization
- [ ] Mejorar la UI de `WorkoutLogs` y `Sesiones`
- [ ] Añadir edición y borrado en la UI
- [ ] Cambiar los modelos mock a una base de datos real
- [ ] Manejo global de errores en frontend
- [ ] Soporte para `PATCH` si se quiere actualización parcial más tarde

---

## 🎨 Logos y branding

- Logo principal: `RoboFit` 🦾
- Íconos sugeridos: `🏋️‍♂️`, `🤖`, `💪`, `📊`
- Paleta inicial: azul suave para botones y tarjetas claras.

---

## 📌 Notas recientes

- El frontend ahora muestra errores reales desde `result.error` en lugar de un mensaje genérico.
- Se corrigió el campo `duration` en `WorkoutLogsForm` para que coincida con el backend.
- Se validó la ruta `POST /api/user-123/sesiones` y el endpoint responde correctamente.
