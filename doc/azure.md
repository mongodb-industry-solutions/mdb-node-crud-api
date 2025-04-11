
Log in to your registry

```sh
az account clear
az login
az acr login --name mdbstore
```

Tag your image
```sh
> docker images
REPOSITORY                         TAG       IMAGE ID       CREATED              SIZE
mdb-node-crud-api-srv              latest    38fdf27532b1   About a minute ago   326MB
mongo                              6.0       9c6e96ed70e8   3 weeks ago          1.01GB
```

```sh
docker tag 38fdf27532b1 mdbstore.azurecr.io/sat/mdbdemo:latest
```

Push the image to your registry
```sh
docker push mdbstore.azurecr.io/sat/mdbdemo:latest
```

To find your Azure subscription ID, follow these steps:
```sh
az account show --query id --output tsv
```

Command to generate the secret:
```sh
az ad sp create-for-rbac --name "sat-terraform-gha" --role contributor --scopes /subscriptions/3f7b9118-7a1e-4a47-5424-3c1fg1b25g5c --sdk-auth
```
Result: 
```json
{
  "displayName": "terraform-sp",
  "appId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",       // <-- client_id
  "password": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",    // <-- client_secret
  "tenant": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"       // <-- tenant_id
}
```

Test the connection:
```sh
az login --service-principal  --username "<client_id>"  --password "<client_secret>"  --tenant "<tenant_id>"
```
Result: 
```json
[
  {
    "cloudName": "AzureCloud",
    "homeTenantId": "c99999a9-999b-9ef9-af16-99548de0c999",
    "id": "9f4b9999-7a1e-9990-a999-9c1f9db20f9c",
    "isDefault": true,
    "managedByTenants": [],
    "name": "MDB-IndustrySolutions",
    "state": "Enabled",
    "tenantId": "c99999a9-999b-9ef9-af16-99548de0c999",
    "user": {
      "name": "9999cdd3-9999-44d2-85c0-37a099d0c0e0",
      "type": "servicePrincipal"
    }
  }
]
```

## References
- [Azure Container Registry documentation](https://learn.microsoft.com/en-us/azure/container-registry/)
- [Sign in with Web Account Manager (WAM)](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively#sign-in-with-web-account-manager-wam-on-windows)