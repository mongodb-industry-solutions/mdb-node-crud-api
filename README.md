# MongoDB Node.js CRUD API

A fully containerized RESTful API built with **Node.js**, **TypeScript**, and **MongoDB Native Driver**. This project follows **object-oriented architecture**, is structured into **controllers**, **services**, and **routes**, and is ready for deployment on **Azure** via Docker and Terraform.

## 📦 Features

- Full CRUD operations on `User` resource
- Native MongoDB driver (no Mongoose)
- Clean architecture using OOP and dependency injection
- Type-safe with TypeScript
- JSDoc documentation
- Docker + Docker Compose support
- Terraform provisioning (Azure-ready)

## 🧱 Project Structure

```
src/
├── controllers/    // Handle HTTP logic
├── services/       // Business logic layer
├── routes/         // Define endpoints
├── models/         // TypeScript interfaces
├── index.ts        // App entry point
```

## 🧪 Available Endpoints

| Method | Endpoint         | Description         |
|--------|------------------|---------------------|
| GET    | `/api/users`     | Get all users       |
| GET    | `/api/users/:id` | Get user by ID      |
| POST   | `/api/users`     | Create a new user   |
| PUT    | `/api/users/:id` | Update user by ID   |
| DELETE | `/api/users/:id` | Delete user by ID   |

## 🛠️ Setup

### Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mydb
```

### 👈 Install

```bash
npm install
```

### 👈 Run Dev

```bash
npm run dev
```

### 👈 Run Production Build

```bash
npm run build
npm start
```

---

## 🐳 Docker Support

### Dockerfile

```bash
docker build -t node-crud-api .
docker run -p 3000:3000 node-crud-api
```

### docker-compose.yml

```yaml
version: '3'
services:
  api:
    build: .
    ports:
      - '3000:3000'
    environment:
      - MONGO_URI=mongodb://mongo:27017/mydb
    depends_on:
      - mongo
  mongo:
    image: mongo:latest
    ports:
      - '27017:27017'
```

### Run with Docker Compose

```bash
docker-compose up --build
```

---

## ☁️ Terraform for Azure

The structure of your Terraform project would look something like this:

```
iac/
│
├── aci/                       # Folder for Azure Container Instances configuration
│   ├── main.tf                # Terraform configuration file
│   ├── variables.tf           # Variable definitions
│   ├── outputs.tf             # Output definitions
│   └── terraform.tfvars       # Variables with sensitive data (environment specific)
│
├── acr-appservice/            # Folder for ACR + App Service configuration
│   ├── main.tf                # Terraform configuration file
│   ├── variables.tf           # Variable definitions
│   ├── outputs.tf             # Output definitions
│   └── terraform.tfvars       # Variables with sensitive data (environment specific)
│
└── README.md                  # Detailed instructions for deploying with Terraform
```

This file will contain sensitive values or configurations specific to your environment, such as mongo_uri, container_image, etc.

```hcl
# terraform.tfvars
resource_group_name = "mycrud-rg"
location            = "East US"
container_group_name = "crud-api"
container_name      = "crud"
image               = "username/mdb-node-crud-api:latest"
mongo_uri           = "mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
dns_label           = "crudapidemolabel"
app_port            = 3000
```

## 🔐 Necessary configuration on GitHub

Before running the pipeline, you must create a secret called:

```
AZURE_CREDENTIALS
```

And its value must be a JSON with the credentials for your `Service Principal`. You can get them like this:

### 🧪 Command to generate the secret:
```bash
az ad sp create-for-rbac \
  --name "sat-terraform-gha" \
  --role contributor \
  --scopes /subscriptions/<your-subscription-id> \
  --sdk-auth
```

This will return a JSON like this:

```json
{
  "clientId": "xxxxx",
  "clientSecret": "xxxxx",
  "subscriptionId": "xxxxx",
  "tenantId": "xxxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "authorityHost": "https://login.microsoftonline.com",
  "clientCertificate": null
}
```

Copy that complete JSON and save it as the value of `AZURE_CREDENTIALS` in GitHub → Settings → Secrets → Actions.

---

## ✅ Resume

This flow leaves everything 100% automated:

- Terraform creates the resources (ACR, Container App).
- GitHub Actions builds and uploads the image to the ACR.
- Terraform already points to the tag `latest`, so run `make apply`.

---

