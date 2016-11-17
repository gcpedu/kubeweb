source ./0.Config.sh
set -o xtrace

# Build v1 of our application as a Docker image
# Take a look in v1/Dockerfile to see what the container does
docker build -t gcr.io/kubeweb/$APPNAME:v1 v1

# List the docker images
docker images

