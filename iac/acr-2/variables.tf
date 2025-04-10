variable "prefix" {}
variable "resource_group_name" {}
variable "location" { default = "East US" }
variable "acr_name" {}
variable "app_name" {}
variable "image_name" {}
variable "mongo_uri" {}
variable "app_port" { default = "3000" }

variable "acr_login_server" {
  description = "The login server of your ACR (e.g., myregistry.azurecr.io)"
}
