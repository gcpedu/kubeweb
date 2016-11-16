source 0.Config.sh
#set -o xtrace

for POD in $(kubectl get pods | grep $APPNAME | awk '{print $1}')
do
  echo -e  "\n\nLogs for $POD"
  kubectl logs $POD
done

