variable "prefix" {
  description = "Prefix for naming Azure resources (e.g., 'sat')"
  type        = string
}

variable "location" {
  description = "Azure region where resources will be created"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
}

variable "acr_name" {
  description = "Unique name for Azure Container Registry (must be globally unique)"
  type        = string
}

variable "containerapp_env_name" {
  description = "Name for the Container Apps environment"
  type        = string
}

variable "containerapp_name" {
  description = "Name for the deployed Container App"
  type        = string
}

variable "docker_image_name" {
  description = "Docker image name inside ACR (e.g. 'sat-api')"
  type        = string
}

variable "docker_image_tag" {
  description = "Docker image tag (e.g. 'latest' or 'v1')"
  type        = string
}

variable "environment_variables" {
  description = "Map of environment variables to inject into the container"
  type        = map(string)
}
