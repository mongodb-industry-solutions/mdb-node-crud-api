variable "resource_group_name" {}
variable "location" { default = "East US" }
variable "container_group_name" {}
variable "container_name" {}
variable "image" {}
variable "app_port" { default = 3000 }
variable "mongo_uri" {}
variable "dns_label" {}
