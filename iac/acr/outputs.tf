// Output the login server for ACR
output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "ACR Login Server URL"
}

// Output the URL of the deployed Container App
output "container_app_url" {
  value       = azurerm_container_app.app.latest_revision_fqdn
  description = "Public FQDN of the deployed Container App"
}
