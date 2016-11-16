source 0.Config.sh
set -o xtrace
#TODO - Enable StackDriver Monitoring

gcloud container --project $PROJECTID \
  clusters create $CLUSTER \
    --zone $ZONE \
    --machine-type "n1-standard-1" \
    --num-nodes "3" \
    --network "default" \
    --enable-cloud-logging \
    --enable-cloud-monitoring \
    --scopes "https://www.googleapis.com/auth/compute","https://www.googleapis.com/auth/devstorage.read_only","https://www.googleapis.com/auth/bigquery","https://www.googleapis.com/auth/sqlservice.admin","https://www.googleapis.com/auth/datastore","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/pubsub","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly"

# Tell us about the cluster created
kubectl cluster-info

# What's running on the master?
kubectl --namespace kube-system get pods

