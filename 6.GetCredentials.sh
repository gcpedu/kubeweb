source 0.Config.sh
set -o xtrace

# Get credentials for the cluster and store this is .kube/config
gcloud container clusters get-credentials $CLUSTER

# Find the endpoints for the cluster
kubectl cluster-info

# Get the credentials to login to the dashboard
echo "Use the following credentials for the Kubernetes Dashboard"
gcloud  container clusters describe $CLUSTER | grep -e password -e user

