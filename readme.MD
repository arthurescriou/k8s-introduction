# K8S-introduction


## Prérequis

- minikube


## Objectif

Déployer une application sur un cluster minikube


### Redis

Déployer une base de donnée Redis à partir de l'image officielle (redis)

- http://redis.io
- https://hub.docker.com/_/redis

### Node-redis

Déployer le serveur fourni

- https://hub.docker.com/repository/docker/arthurescriou/node-redis/general

Utiliser la version 1.0.0

Pour que le serveur fonctionne correctement vous devez ajouter ses configurations dans son environment.

```bash
env:
  - name: PORT
    value: <port>
  - name: REDIS_URL
    value: redis://<address-of-base>
```

### Service
Créer un service pour le serveur node-redis et le rentre accessible de l'exterieur du cluster.

### Pods
Un fois qu'un serveur fonctionne augmentez le nombre de pods (node-redis), entre 3 et 5. Et vérifier que cela fonctionne toujours.

## Commandes utiles

Visualiser les ressources déployées

```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

Récupérer les log d'un pod

```bash
kubectl logs <pod-id>
```

Utiliser un fichier yaml, dans votre cas l'image docker ne devrais pas changer donc il est possible de seulement apply le yaml une fois créé

Pensez à nommer votre yaml avec votre nom (et pas juste pod.yaml, pour éviter les collisions)

```bash
kubectl create -f file.yaml
kubectl delete -f file.yaml
kubectl apply -f file.yaml
```
