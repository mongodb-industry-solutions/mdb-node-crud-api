output "container_app_fqdn" {
  description = "The fully-qualified domain name (URL) of the deployed container app"
  value       = azurerm_container_app.app.latest_revision_fqdn
}
