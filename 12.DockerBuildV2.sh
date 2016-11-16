source ./0.Config.sh
docker build --no-cache -t gcr.io/$PROJECTID/$APPNAME:v2 v2

docker images

