provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "rg-node-crud-api"
  location = "East US"
}

resource "azurerm_container_group" "api" {
  name                = "nodecrudapi"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  os_type             = "Linux"

  container {
    name   = "node-api"
    image  = "<your_registry>/node-crud-api:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 3000
      protocol = "TCP"
    }

    environment_variables = {
      MONGO_URI = "<mongo_connection_string>"
    }
  }

  ip_address_type = "public"
  dns_name_label  = "nodecrudapi-service"
}