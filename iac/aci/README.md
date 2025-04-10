# Azure Deployment with Container Instances (ACI)

This setup deploys your Node.js app using Docker to Azure Container Instances (ACI), which is simpler but less scalable than App Service.

## Usage (Azure Container Instance)

1. Initialize the Terraform configuration:

```bash
cd iac/aci

terraform init

terraform apply -var="resource_group_name=mycrud-rg" \
                -var="container_group_name=crud-api" \
                -var="container_name=crud" \
                -var="image=username/mdb-node-crud-api:latest" \
                -var="mongo_uri=${your_mongodb_uri}" \
                -var="dns_label=crudapidemolabel"

```