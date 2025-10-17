# Kairos - Sistema de Turnos

Sistema web para la gestión eficiente de turnos de diversos servicios, desarrollado con React 18 + Vite en el frontend y ASP.NET Core Web API en el backend.

![Logo de Kairos](https://github.com/Fra46/KairosWebAPI/blob/master/Kairos.jpg)

## 🚀 Características

- **Gestión de Turnos**: Solicitud, visualización y administración de turnos en tiempo real
- **Gestión de Usuarios**: Registro y administración de clientes
- **Gestión de Servicios**: CRUD completo de servicios (universitario, atencion al cliente, etc.)
- **Panel de Administración**: Control centralizado para avanzar turnos y monitorear el sistema
- **Interfaz Moderna**: Diseño responsive con Bootstrap 5

## 🛠️ Tecnologías

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Bootstrap 5

### Backend
- ASP.NET Core 8.0 Web API
- Entity Framework Core
- SQL Server
- CORS habilitado

## 📋 Requisitos Previos

- Node.js 18+ y npm
- .NET 8.0 SDK
- SQL Server (LocalDB o instancia completa)
- Visual Studio 2022 Community (recomendado para backend)
- VS Code (recomendado para frontend)

## 🔧 Instalación y Configuración

### Backend (ASP.NET Core)

1. Clona el repositorio del backend:
```bash
git clone https://github.com/Fra46/KairosWebAPI
```

2. Restaura las dependencias:


```shellscript
dotnet restore
```

3. Configura la cadena de conexión en `appsettings.json`:


```json
{
  "ConnectionStrings": {
    "Connection": "Server=(localdb)\\mssqllocaldb;Database=KairosDB;Trusted_Connection=True;"
  }
}
```

4. Aplica las migraciones:


```shellscript
Add-Migration nombre-migracion
```

5. Ejecuta el backend:


```shellscript
Click en https
```

El backend estará disponible en `https://localhost:7299`

### Frontend (React + Vite)

1. Clona este repositorio:


```shellscript
git clone https://github.com/Fra46/KairosWebAPI
```

2. Instala las dependencias:


```shellscript
npm install react-router-dom axios bootstrap
npm install
```

3. Configura el proxy en `vite.config.js` (ya configurado por defecto):


```javascript
proxy: {
  '/api': {
    target: 'https://localhost:7299',
    changeOrigin: true,
    secure: false
  }
}
```

4. Ejecuta el frontend:


```shellscript
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```plaintext
kairos-frontend/
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   └── TurnoCard.jsx
│   ├── pages/           # Páginas/Vistas
│   │   ├── Home.jsx
│   │   ├── SolicitarTurno.jsx
│   │   ├── PanelAdmin.jsx
│   │   ├── Servicios.jsx
│   │   └── Usuarios.jsx
│   ├── services/        # Servicios API
│   │   ├── api.js
│   │   ├── turnoService.js
│   │   ├── servicioService.js
│   │   └── usuarioService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── vite.config.js
└── package.json
```

## Uso

1. **Crear Usuarios**: Accede a la sección "Usuarios" para registrar clientes
2. **Crear Servicios**: En "Servicios" puedes agregar los servicios disponibles (comedor, atencion, etc.)
3. **Solicitar Turno**: Los usuarios pueden solicitar turnos seleccionando un servicio
4. **Panel Admin**: Los administradores pueden ver y avanzar los turnos en tiempo real
5. **Visualización**: La página de inicio muestra el turno actual en pantalla grande


## API Endpoints

### Turnos

- `GET /api/Turnos` - Obtener todos los turnos
- `GET /api/Turnos/pendientes` - Obtener turnos pendientes
- `GET /api/Turnos/actual` - Obtener turno actual
- `POST /api/Turnos` - Crear nuevo turno
- `POST /api/Turnos/siguiente` - Avanzar al siguiente turno


### Servicios

- `GET /api/Servicios` - Obtener todos los servicios
- `POST /api/Servicios` - Crear servicio
- `PUT /api/Servicios/{id}` - Actualizar servicio
- `DELETE /api/Servicios/{id}` - Eliminar servicio


### Usuarios

- `GET /api/Usuarios` - Obtener todos los usuarios
- `POST /api/Usuarios` - Crear usuario
- `PUT /api/Usuarios/{id}` - Actualizar usuario
- `DELETE /api/Usuarios/{id}` - Eliminar usuario


## Licencia

Este proyecto está bajo la Licencia [MIT](https://opensource.org/licenses/MIT).

## Autores

Andres Zapata
- GitHub: [@Fra46](https://github.com/Fra46)

Maira Torres
- GitHub: [@Fra46](https://github.com/22MAT11)

Daniel Castro
- GitHub: [@Fra46](https://github.com/Raizonkill)

Ruben Guitierrez
- GitHub: [@Fra46](https://github.com/ErisGC)

## Agradecimientos

- Comunidad de React y ASP.NET Core
