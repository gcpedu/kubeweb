source ./0.Config.sh
set -o xtrace

docker create -p 8080:8080 --name "${APPNAME}.v2" -t gcr.io/kubeweb/$APPNAME:v2
docker start "${APPNAME}.v2"
docker ps -a


