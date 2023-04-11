# sealos bytebase

## develop

```
# io
echo '35.240.227.100 apiserver.cluster.local' | sudo tee -a /etc/hosts
# cn
echo '121.41.82.246 apiserver.cluster.local' | sudo tee -a /etc/hosts
# env kubeconfig
.env.local
```

## build and push the image

Just add a field like build tag:1.0.0 to the commit message, and take the string after tag: as the image tag

Execute github actions when there is a build field in the git commit message

```
.github/workflows/release-package.yml
```
