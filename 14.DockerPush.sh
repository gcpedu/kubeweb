source ./0.Config.sh
set -o xtrace

gcloud docker -- push gcr.io/$PROJECTID/$APPNAME:v2
gcloud docker -- images

