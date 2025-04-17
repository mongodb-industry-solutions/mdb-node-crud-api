terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.74.0"
    }
  }
  required_version = ">= 1.5.0"
}

provider "azurerm" {
  features {}

  subscription_id = var.subscription_id
  tenant_id       = var.tenant_id
  client_id       = var.client_id
  client_secret   = var.client_secret
}

# -------------------------
# Resource Group
# -------------------------
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

# -------------------------
# Azure Container Registry (ACR)
# -------------------------
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "Standard"
  admin_enabled       = true # Enables username/password for easier testing

  tags = {
    environment = "testing"
    project     = var.prefix
  }
}

# -------------------------
# Container Apps Environment
# -------------------------
resource "azurerm_container_app_environment" "env" {
  name                = var.containerapp_env_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  tags = {
    environment = "dev"
    project     = var.prefix
  }
}

# -------------------------
# Container App (Runs Docker image from ACR)
# -------------------------
resource "azurerm_container_app" "app" {
  name                         = var.containerapp_name
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  depends_on = [azurerm_container_app_environment.env]

  # Enables managed identity to access ACR
  identity {
    type = "SystemAssigned"
  }

  template {
    container {
      name   = "app"
      image  = "${azurerm_container_registry.acr.login_server}/${var.docker_image_name}:${var.docker_image_tag}"
      cpu    = 0.5     # 0.5 vCPU
      memory = "1.0Gi" # 1GB RAM

      # Environment variables passed to container at runtime
      dynamic "env" {
        for_each = var.environment_variables
        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }

  ingress {
    external_enabled = true # Publicly accessible
    target_port      = 3000 # Port exposed by app
    transport        = "auto"
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  registry {
    server   = azurerm_container_registry.acr.login_server
    identity = "SystemAssigned"
  }

  tags = {
    environment = "testing"
    project     = var.prefix
  }
}

# -------------------------
# Role Assignment: allow container app to pull from ACR
# -------------------------
resource "azurerm_role_assignment" "acr_pull" {
  principal_id         = azurerm_container_app.app.identity[0].principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}
