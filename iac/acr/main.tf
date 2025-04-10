// Main infrastructure resources for ACR and Azure Container App

// Create Resource Group
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

// Create Azure Container Registry (ACR)
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard" // "Standard" SKU supports build tasks
  admin_enabled       = true       // Required to allow Terraform build task

  tags = {
    project     = var.prefix
    environment = "dev"
  }
}

// Create Container Apps Environment
resource "azurerm_container_app_environment" "env" {
  name                = var.containerapp_env_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  tags = {
    project     = var.prefix
    environment = "dev"
  }
}

// Deploy the Azure Container App
resource "azurerm_container_app" "app" {
  name                          = var.containerapp_name
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name           = azurerm_resource_group.rg.name
  revision_mode                 = "Single" // Only one active revision at a time

  template {
    container {
      name  = "app"
      image = "${azurerm_container_registry.acr.login_server}/${var.docker_image_name}:${var.docker_image_tag}"

      // Dynamic block to load environment variables from variable map
      dynamic "env" {
        for_each = var.environment_variables
        content {
          name  = env.key
          value = env.value
        }
      }
    }

    ingress {
      external_enabled = true // App is publicly accessible
      target_port      = 3000 // Port exposed by the app container
      transport        = "auto"
    }
  }

  identity {
    type = "SystemAssigned" // Enables system-assigned managed identity
  }
}

// Grant the Container App permission to pull images from ACR
resource "azurerm_role_assignment" "acr_pull" {
  principal_id         = azurerm_container_app.app.identity[0].principal_id
  role_definition_name = "AcrPull"
  scope                = azurerm_container_registry.acr.id
}

// Define a Container Registry Task to build and push the image automatically from GitHub
resource "azurerm_container_registry_task" "build_task" {
  name                  = "${var.prefix}-acr-build"
  container_registry_id = azurerm_container_registry.acr.id
  resource_group_name   = azurerm_resource_group.rg.name
  location              = azurerm_resource_group.rg.location

  platform {
    os = "Linux"
  }

  docker_step {
    dockerfile_path = "Dockerfile" // Dockerfile path within repo
    context_path    = var.build_context_path
    image_names     = ["${var.docker_image_name}:${var.docker_image_tag}"]
    is_push_enabled = true
    no_cache        = false
  }

  source_trigger {
    name           = "source-trigger"
    source_type    = "Github"
    repository_url = var.build_repository_url
    branch         = var.build_branch

    source_repository_auth {
      type = "None" // Change to PAT if using a private repo
    }
  }

  trigger {
    source_triggers_enabled = true

    base_image_trigger {
      name                   = "base-image"
      base_image_trigger_type = "Runtime"
    }
  }

  tags = {
    project = var.prefix
  }
}
