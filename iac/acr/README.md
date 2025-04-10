# Azure Deployment with App Service + ACR

This setup deploys your Node.js app using Docker from Azure Container Registry (ACR) to an Azure App Service.

## Usage

1. Initialize the Terraform configuration:
```bash
cd iac/acr-appservice

terraform init

terraform apply -var="prefix=mycrud" \
                -var="resource_group_name=mycrud-rg" \
                -var="acr_name=mycrudacr" \
                -var="app_name=mycrud-api" \
                -var="image_name=mdb-node-crud-api" \
                -var="mongo_uri=${your_mongodb_uri}" \
                -var="acr_login_server=mycrudacr.azurecr.io"
```