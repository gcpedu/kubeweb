source 0.Config.sh
set -o xtrace

#kubectl run $APPNAME --image=gcr.io/$PROJECTID/$APPNAME:v2 --port=8080
kubectl create -f v2/deployment.yaml
#Use this command to just see the pods for the beta track
#kubectl get pods -l track=beta
kubectl get pods 

#kubectl expose deployment $APPNAME --type="LoadBalancer" --port 8080 --target-port=8080
kubectl create -f v2/service.yaml
sleep 2
kubectl describe service $APPNAME-v2

