provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "aci" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_group" "crud_api" {
  name                = var.container_group_name
  location            = azurerm_resource_group.aci.location
  resource_group_name = azurerm_resource_group.aci.name
  os_type             = "Linux"

  container {
    name   = var.container_name
    image  = var.image
    cpu    = "0.5"
    memory = "1.5"

    environment_variables = {
      MONGO_URI = var.mongo_uri
      PORT      = var.app_port
    }

    ports {
      port     = var.app_port
      protocol = "TCP"
    }
  }

  ip_address_type = "public"
  dns_name_label  = var.dns_label
  ports {
    port     = var.app_port
    protocol = "TCP"
  }
}