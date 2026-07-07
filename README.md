# 🏋️ RoboFit

Bitácora digital de entrenamiento de alto rendimiento diseñada para deportistas amateurs que entrenan solos. Registra tus sesiones y ejercicios en un entorno minimalista, privado y sin la presión social de los feeds tradicionales.

---

## 🚀 Enlaces de Producción

*   **⚡ Frontend (Vercel)**: [https://robo-fit-digital-house.vercel.app](https://robo-fit-digital-house.vercel.app)
*   **☁️ Backend API (Render)**: [https://robofit-digitalhouse.onrender.com](https://robofit-digitalhouse.onrender.com)

> [!IMPORTANT]
> **Nota de Despliegue (Cold Start)**: Dado que el backend está alojado en el plan gratuito de **Render**, la primera solicitud después de 15 minutos de inactividad puede demorar entre **30 y 60 segundos** en responder mientras la instancia se reactiva. Una vez activa, el servicio responde a velocidad normal de inmediato.

---

## 🛠️ Stack Tecnológico

El proyecto está construido con un enfoque moderno, robusto y eficiente:

*   [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) – Biblioteca para la interfaz de usuario reactiva y fluida.
*   [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) – Herramienta de compilación ultra rápida para el frontend.
*   [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/) – Entorno de ejecución para el servidor.
*   [![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) – Framework web minimalista para la API del backend.
*   [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/) – Backend-as-a-Service para la persistencia e integración veloz de base de datos.
*   [![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/) – Enrutamiento declarativo para aplicaciones React.

---

## 📐 Arquitectura del Proyecto

El proyecto está organizado en un **monorepo** limpio con dos áreas bien definidas para desacoplar el cliente del servidor:

```text
robofit/
├── backend/               # Servidor API Express + Supabase SDK
│   ├── src/
│   │   ├── controllers/   # Controladores con lógica del CRUD para sesiones y registros
│   │   ├── models/        # Definiciones de los esquemas de datos expuestos
│   │   ├── routes/        # Ruteo y endpoints de la API REST
│   │   └── supabase.js    # Conexión inicial al cliente de Supabase
│   ├── index.js           # Servidor de entrada
│   └── package.json       # Dependencias y scripts del backend
│
├── frontend/              # Aplicación SPA en React
│   ├── src/
│   │   ├── components/    # Componentes de UI (Landing Page interactiva, Formularios, Listados)
│   │   ├── services/      # Abstracción de peticiones HTTP a la API
│   │   ├── App.jsx        # Enrutador principal y estructura del layout
│   │   └── main.jsx       # Punto de entrada de React
│   ├── index.html         # Archivo raíz HTML con fuentes tipográficas
│   └── package.json       # Dependencias y configuración de scripts Vite
│
└── README.md
```

### Entidades y Modelado de Datos

*   **Sesion**: Representa una jornada de entrenamiento. Almacena:
    *   `nombre` (Ej. "Fuerza de Piernas")
    *   `deporte` (Ej. "Fuerza", "Running")
    *   `duracionMinutos` (Duración total)
    *   `nivel` ("principiante", "intermedio", "avanzado")
    *   `fecha` (Día de registro)
*   **WorkoutLog**: Representa cada uno de los ejercicios ejecutados dentro de una sesión vinculada mediante foreign key. Almacena:
    *   `exercise` (Nombre del ejercicio)
    *   `sets` (Cantidad de series)
    *   `reps` (Repeticiones por serie)
    *   `weight` (Peso utilizado en kg)
    *   `duration` (Duración específica del ejercicio)
    *   `date` (Fecha de guardado)

---

## 💻 Configuración Local

Sigue los siguientes pasos para clonar y ejecutar el entorno de desarrollo localmente:

### Requisitos Previos

*   [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
*   Una cuenta activa de [Supabase](https://supabase.com/) con un proyecto inicializado.

### 1. Variables de Entorno

Debes crear dos archivos `.env` locales en sus respectivos directorios para la correcta comunicación:

#### En `/backend/.env`:
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-anon-public-key-de-supabase
```

#### En `/frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```

---

### 2. Ejecución de Servicios

Abre dos pestañas de terminal independientes para ejecutar ambos entornos:

#### Terminal 1: Backend
```bash
# Entrar al directorio
cd backend

# Instalar dependencias
npm install

# Iniciar servidor en modo desarrollo (recarga automática)
npm run dev
```

#### Terminal 2: Frontend
```bash
# Entrar al directorio
cd frontend

# Instalar dependencias
npm install

# Iniciar cliente local (Vite)
npm run dev
```
La aplicación cliente estará lista para usar en `http://localhost:5173/`.

---

## 🎨 Características Destacadas

*   **Filosofía Zero Pressure**: Diseñado para el progreso propio, sin notificaciones invasivas, tablas de puntuación colectivas ni feeds ruidosos.
*   **Landing Page Deportiva e Interactiva**: Sección Hero con diseño editorial de alto rendimiento, tarjetas de ejercicios de demostración dinámicas e indicadores visuales de consistencia.
*   **Carga Rápida en el Gimnasio**: Formularios optimizados para el uso móvil (responsive design), facilitando el logueo de ejercicios y series durante los descansos entre sets.
*   **Gestión Flexible**: Capacidad completa de creación, lectura, edición y borrado (CRUD) para registros de sesiones y rutinas internas.


## Capturas de Pantalla : <br>
### Inicio: <br>
<img width="864" height="553" alt="image" src="https://github.com/user-attachments/assets/e46a465b-36ae-49cc-b105-d023fe320d91" />

### Sesiones: <br>
<img width="859" height="600" alt="image" src="https://github.com/user-attachments/assets/7a4d152e-68e9-43f6-83dd-523f278c3e24" />

