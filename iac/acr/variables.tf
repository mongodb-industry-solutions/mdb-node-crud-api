// Project-level prefix for all resources
variable "prefix" {
  description = "Prefix used to identify resources"
  type        = string
  default     = "sat"
}

// Azure region
variable "location" {
  description = "Azure region where resources are deployed"
  type        = string
  default     = "eastus"
}

// Resource Group name
variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
}

// Azure Container Registry name
variable "acr_name" {
  description = "Name of the Azure Container Registry"
  type        = string
}

// Container App environment name
variable "containerapp_env_name" {
  description = "Name for the Container App Environment"
  type        = string
}

// Container App name
variable "containerapp_name" {
  description = "Name of the Azure Container App"
  type        = string
}

// Docker image name and tag
variable "docker_image_name" {
  description = "Name of the Docker image"
  type        = string
}

variable "docker_image_tag" {
  description = "Tag of the Docker image"
  type        = string
  default     = "latest"
}

// App environment variables (e.g., MONGO_URI, PORT)
variable "environment_variables" {
  description = "Map of environment variables for the container"
  type        = map(string)
}

// ACR Task build repository config
variable "build_repository_url" {
  description = "Public GitHub repo containing the Dockerfile"
  type        = string
}

variable "build_branch" {
  description = "Branch to trigger builds from"
  type        = string
  default     = "main"
}

variable "build_context_path" {
  description = "Relative path in the repo where Dockerfile is located"
  type        = string
  default     = "."
}
