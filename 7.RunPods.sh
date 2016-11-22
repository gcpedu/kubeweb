source 0.Config.sh
set -o xtrace

#kubectl run $APPNAME --image=gcr.io/$PROJECTID/$APPNAME:v1 --port=8080
sed "s/YOURPROJECTID/$PROJECTID/" v1/template.deployment.yaml > v1/deployment.yaml
kubectl create -f v1/deployment.yaml
kubectl get pods


