
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


## References
- [Azure Container Registry documentation](https://learn.microsoft.com/en-us/azure/container-registry/)
- [Sign in with Web Account Manager (WAM)](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively#sign-in-with-web-account-manager-wam-on-windows)