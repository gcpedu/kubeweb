source 0.Config.sh
kubectl scale deployment $APPNAME-v1 --replicas=4
sleep 3
#kubectl get pods -l track=stable
kubectl get pods 
