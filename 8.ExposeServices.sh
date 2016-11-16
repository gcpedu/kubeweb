source 0.Config.sh
set -o xtrace
#kubectl expose deployment $APPNAME --type="LoadBalancer" --port 8080 --target-port=8080
kubectl create -f v1/service.yaml
sleep 2
kubectl describe service $APPNAME-v1
echo "Try the following commands to check the status of the service"

echo "kubectl get services"
echo "kubectl describe service $APPNAME-v1"
