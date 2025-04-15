# 🚀 Backend con NestJS + Serverless Framework

Proyecto backend construido con [NestJS](https://nestjs.com/) y desplegable mediante [Serverless Framework](https://www.serverless.com/). Ideal para arquitecturas serverless en AWS Lambda.

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- ⚙️ [Node.js](https://nodejs.org/) (recomendado: LTS)
- 📦 [npm](https://www.npmjs.com/)
- 🌩️ Serverless Framework CLI

```bash
npm install -g serverless
```

---

## 📥 Instalación del Proyecto

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. **Instalar dependencias**

```bash
npm install --legacy-peer-deps
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos MySQL
DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

🔒 **Importante:** Nunca subas tu archivo `.env` al repositorio. Añádelo a tu `.gitignore`.

📌 **Nota:** Este proyecto utiliza **Twilio** para el envío de SMS. Actualmente, **solo el número +51910552498 está autorizado para recibir mensajes**. Otros números no recibirán mensajes y su estado será marcado como error.

---

## 🛠️ Comandos Útiles

### 🔧 Compilar el proyecto

```bash
npm run build
```

### 💻 Ejecutar en modo local (offline)

```bash
serverless offline
```

---

## 📁 Estructura del Proyecto


```bash
src/
├── api/
│   ├── controller/
│   │   ├── campaign.controller.ts
│   │   ├── message.controller.ts
│   │   └── users.controller.ts
│   └── api.module.ts
│
├── domain/
│   ├── dto/
│   │   ├── request/
│   │   └── response/
│   └── model/
│       ├── campaign.model.ts
│       ├── customer.model.ts
│       ├── message.model.ts
│       └── user.model.ts
│
├── infrastructure/
│   ├── configuration/
│   ├── enums/
│   │   ├── campaign-status.enum.ts
│   │   └── message-mapping.enum.ts
│   └── utils/
│
├── repository/
│   ├── abstract/
│   │   ├── iCampaign.repository.ts
│   │   ├── iMessage.repository.ts
│   │   └── iUser.repository.ts
│   ├── campaign.repository.ts
│   ├── message.repository.ts
│   └── user.repository.ts
│
├── service/
│   ├── abstract/
│   │   ├── iCampaign.service.ts
│   │   ├── iMessage.service.ts
│   │   └── iUser.service.ts
│   ├── mapping/
│   │   ├── campaign.service.ts
│   │   ├── message.service.ts
│   │   └── user.service.ts
│
├── app.controller.spec.ts
├── app.controller.ts
└── app.module.ts

```

---

- Accede a la documentación de los endpoints: [`http://localhost:3000/api/swagger`](http://localhost:3000/api/swagger)

---

## 🚀 Despliegue en Producción

Asegúrate de tener configuradas tus credenciales de AWS. Luego, ejecuta:

```bash
serverless deploy
```

---

## 📚 Recursos Útiles

- [NestJS - Documentación Oficial](https://docs.nestjs.com/)
- [Serverless Framework - Documentación](https://www.serverless.com/framework/docs)
- [Twilio](https://www.twilio.com/docs)
- [Dotenv - Uso de variables de entorno](https://www.npmjs.com/package/dotenv)

---

## 🤝 Contribuciones

Si quieres contribuir, ¡eres bienvenido! Abre un `Pull Request` o crea un `Issue` con sugerencias o mejoras.

---

## 🧾 Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).

