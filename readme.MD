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

### Frontend

Pour tester que le serveur node-redis fonctionne correctement vous pouvez lancer un frontend :
https://github.com/arthurescriou/redis-react

<a href="https://github.com/arthurescriou/redis-react/blob/9deaa0cf1d1397aa8206083773f24c86bb4caa0d/src/App.js#L5"> pensez à modifier le port si besoin</a>

### Mise à l'échelle

On veut maintenant augmenter la capacité de la base de donnée redis.

On peut s'inspirer de ce <a href="https://github.com/codenote-net/docker-redis-master-slave/blob/master/docker-compose.yml">docker-compose</a> pour remplacer la base redis par un cluster.

### Monté de version

La version déployé du serveur est la 1.0.0. Elle est assez pauvre en log. On voudrait augmenter cette version sans rentre indisponible notre serveur.

Pour ça on veut tester les version 1.0.1 et 1.0.3 de la même image.

Attention la verion 1.0.1 ne démarre pas à cause d'un bug.

En changeant le numéro de version dans le fichier yml on peut modifier la version déployé.
Cependant on voudrait également utiliser la stratégie de déploiement en `rollingUpdate` pour garder un serveur en ligne pendant toute l'opération.

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
