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
git clone https://github.com/RobertLYucra/sinapsis-campaign-backend.git
cd sinapsis-campaign-backend
```

2. **Instalar dependencias**

```bash
npm install 
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Twilio Config
TWILIO_SID= twilio_sid
TWILIO_TOKEN= twilio_token
TWILIO_PHONE= phone_number

# Base de datos MySQL
DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

🔒 **Importante:** Nunca subas tu archivo `.env` al repositorio. Añádelo a tu `.gitignore`.

📌 **Nota:** Consideración sobre Twilio:
El proyecto incluye integración con Twilio. Sin embargo, debido a las limitaciones de mi cuenta gratuita, actualmente solo se puede enviar mensajes al número +51 927 676 456.

En caso desee habilitar el envío real mediante Twilio, puede dirigirse al archivo:

```bash
src/service/campaign.service.ts
```
En la línea 147 encontrará el uso de Twilio comentado. Para activarlo:
Comente la línea 144.
Descomente la línea 147.


---

## 🛠️ Comandos Útiles para Despliegue

### 🔧 Compilar el proyecto

```bash
npm run build
```

### 💻 Ejecutar en modo local (offline)

```bash
serverless offline
```

## 🚀 Despliegue en Producción

Asegúrate de tener configuradas tus credenciales de AWS. Luego, ejecuta:

```bash
serverless deploy
```

---

- Accede a la documentación de los endpoints: [`http://{HOST}/api/swagger`](http://{HOST}/api/swagger)

---

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

