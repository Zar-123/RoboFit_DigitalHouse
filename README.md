# RoboFit

RoboFit es una bitácora digital de entrenamiento para deportistas amateurs que entrenan solos. Permite registrar sesiones de entrenamiento y los ejercicios dentro de cada sesión, visualizando el progreso de forma simple y sin presión.

## Stack

- Node.js + Express (backend)
- React + Vite (frontend)
- Supabase (base de datos)
- Render (deploy backend)
- Vercel (deploy frontend)

## Entidades

- Sesion: representa el entrenamiento del día (nombre, deporte, duración, nivel, fecha)
- WorkoutLog: representa un ejercicio dentro de una sesión (exercise, sets, reps, weight, duration, date) — vinculado a Sesion por foreign key

## URLs de producción

- Frontend: https://robo-fit-digital-house.vercel.app
- Backend: https://robofit-digitalhouse.onrender.com

## Variables de entorno necesarias para correr el proyecto localmente

### Backend

- SUPABASE_URL
- SUPABASE_KEY

### Frontend

- VITE_API_URL

## Nota

El backend en Render usa el free tier. La primera request después de 15 minutos de inactividad puede tardar 30-60 segundos en responder.

## Ejecutar localmente

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
