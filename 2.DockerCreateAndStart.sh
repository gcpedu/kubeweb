source ./0.Config.sh
set -o xtrace

# Create firewalls to allow access to 8080 if you need them
#FWRULE="${APPNAME}-allow-808x"
#gcloud compute --project $PROJECTID firewall-rules delete  $FWRULE 
#gcloud compute --project $PROJECTID firewall-rules create $FWRULE --allow tcp:8080-8089 --network "default" --source-ranges "0.0.0.0/0"

# Create an instance of the container from our image
docker create -p 8080:8080 --name ${APPNAME}.v1 -t gcr.io/$PROJECTID/$APPNAME:v1

# Start our image
docker start ${APPNAME}.v1

# List containers
docker ps -a


