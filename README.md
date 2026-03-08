# 🎬 MovieData – Aplicación de Películas con TMDB

Aplicación web desarrollada con React + TypeScript + Vite que permite explorar películas utilizando la API de The Movie Database (TMDB).

La aplicación permite visualizar listados de películas, ver detalles completos, cargar más resultados dinámicamente y navegar entre vistas, todo con una interfaz moderna, accesible y responsive.

El proyecto se centra en:
* Arquitectura modular
* Gestión de estado mediante hooks personalizados
* Consumo de APIs externas
* Accesibilidad y semántica HTML
* Testing del frontend


---

![login](./src/assets/inicio_sesion.png)

![registrarse](./src/assets/registrarse.png)

![movies](./src/assets/movies.png)

![detail](./src/assets/detail.png)

---

## 🚀 Tecnologías usadas

- React: 19.2.0
- TypeScript: 5.9.3
- Vite: 7.3.1
- Tailwind CSS: 4.1.18
- React Router DOM: 7.13.0
- Vitest:4.0.18


---

## 📸 Funcionalidades

- Autenticación de usuarios mediante Firebase
- Listado de películas populares desde TMDB
- Sistema de paginación con botón “Cargar más”
- Vista de detalle de película
- Página 404 para rutas inexistentes

---

## 📂 Estructura del proyecto

```txt
src/
├── components/
│   ├── layout/
│   │   └── ContainerMovies
|   |   └── Navbar
|   |   └── Section
│   │
│   ├── ui/
│       └── button
│       └── ErrorState
│       └── form
│       └── input
│       └── label
│       └── scroll-area
│
├── features/
│   ├── auth/
│   │   ├── components/
|   |   |    └── AuthLayout
|   |   |    └── LoginForm
|   |   |    └── Logout
|   |   |    └── RegisterForm
│   │   ├── context/
|   |   |    └── AuthContext
│   │   ├── hooks/
|   |   |    └── useAuth
│   │   └── services/
│   │   ├── schema/
|   |   |    └── LoginSchema
|   |   |    └── passwordSchema
|   |   |    └── registerSchema
│   │   ├── services/
|   |   |    └── loginService
│   │
│   ├── movies/
│       ├── components/
|       |    └── MovieCard
|       |    └── MovieCardCast
|       |    └── MovieCastList
|       |    └── MovieDetail
|       |    └── MovieList
|       |    └── MovieSimilarList
│       ├── hooks/
|       |    └── useMovies
│       ├── services/
|       |    └── tmdb.service
|       |    └── tmdbClient
│       └── types/
|       |    └── cast-member
|       |    └── genre
|       |    └── Movie-credits
|       |    └── Movie-detail
|       |    └── movie
|       |    └── movie-response
│
├── pages/
│   ├── LoginPage
│   ├── MovieDetailPage
│   └── MoviePage
│   └── RegisterPage
│
├── routes/
│   ├── AppRoutes
│   ├── ProtectedRoute
│
├── styles/
│   ├── style
│
└── tests/
│   ├── MovieCastList.test
│   ├── MovieDetail.test
│   └── MovieList.test
│   └── MovieSimilarList.test
│   ├── MovieCard.test
│   ├── tmdb.service.test
│   └── tmdbClient.test
````
 
 ## 🔗 API utilizada

La aplicación consume la API de:

The Movie Database (TMDB)

https://www.themoviedb.org/

Para usar la API es necesario generar una API Key gratuita.

## Cómo obtener la API Key de TMDB 🎬
```
	1.	Crear cuenta en TMDB
        https://www.themoviedb.org/signup
	2.	Ir a: Settings → API
```

### Cómo obtener la API Key de Firebase 🔥

```
  1. Crear cuenta en Firebase
   https://firebase.google.com/

  2. Ir a la consola de Firebase:
   https://console.firebase.google.com/

  3. Crear un nuevo proyecto o seleccionar uno existente

  4. Ir a Configuración del proyecto → Configuración general → Tus apps

  5. Registrar una app web y copiar la configuración (API Key, Auth Domain, etc.)
```

## ⚙️ Variables de entorno

Para ejecutar el proyecto correctamente es necesario crear un archivo:
 ```
 .env
 
 ```
en la raíz del proyecto.

Dentro del archivo debes añadir las siguientes variables:

```bash
  VITE_API_KEY=tu_api_key_de_tmdb
  VITE_API_URL=https://api.themoviedb.org/3
  VITE_FIREBASE_API_KEY = tu_api_key_de_firebase
  VITE_FIREBASE_AUTH_DOMAIN = tu_auth_domain_firebase
  VITE_FIREBASE_PROJECT_ID = tu_project_id_firebase
  VITE_FIREBASE_APP_ID = tu_app_id_firebase
```
 
 ## 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/josep100/Sprint-7.-Context_React_Query.git
```

## 2️⃣ Acceder al directorio del proyecto

```bash
  cd tu-repositorio
```

## 3️⃣ Instalar dependencias

```bash
  npm install
```

## 4️⃣ Ejecutar la aplicación en desarrollo

```bash
  npm run dev
```

