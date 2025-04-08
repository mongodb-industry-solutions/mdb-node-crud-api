
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

## References
- [Azure Container Registry documentation](https://learn.microsoft.com/en-us/azure/container-registry/)
- [Sign in with Web Account Manager (WAM)](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli-interactively#sign-in-with-web-account-manager-wam-on-windows)