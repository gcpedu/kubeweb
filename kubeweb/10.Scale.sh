source 0.Config.sh
kubectl scale deployment $APPNAME --replicas=4
sleep 3
#kubectl get pods -l track=stable
kubectl get pods 
