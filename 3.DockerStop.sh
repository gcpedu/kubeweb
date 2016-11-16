source 0.Config.sh
set -o xtrace

echo "Running Docker Processes"
docker ps -a
echo "Stopping $APPNAME.v1"
docker stop $APPNAME.v1
echo "Running Docker Processes"
docker rm $APPNAME.v1
docker ps -a
