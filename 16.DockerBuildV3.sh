source ./0.Config.sh
set -o xtrace

docker build --no-cache -t gcr.io/kubeweb/$APPNAME:v3 v3

docker images

