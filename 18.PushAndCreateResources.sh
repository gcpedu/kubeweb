source ./0.Config.sh
set -o xtrace

gcloud docker -- push gcr.io/kubeweb/$APPNAME:v3
gcloud docker -- images
kubectl delete configmap nodehello-conf
kubectl create configmap nodehello-conf --from-file=v3.prod.resources/nodehello.config.json
kubectl delete secret nodehello-auth
kubectl create secret generic nodehello-auth --from-file=v3.prod.resources/nodehello.jwt.json

