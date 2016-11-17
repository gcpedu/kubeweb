source ./0.Config.sh

FWRULE="kubedemo-allow-808x"

#gcloud compute --project $PROJECTID firewall-rules delete  $FWRULE 
#gcloud compute --project $PROJECTID firewall-rules create $FWRULE --allow tcp:8080-8089 --network "default" --source-ranges "0.0.0.0/0" 

docker create -p 8080:8080 --name "${APPNAME}.v3" -t gcr.io/kubeweb/$APPNAME:v3
docker start "${APPNAME}.v3"

docker ps -a


