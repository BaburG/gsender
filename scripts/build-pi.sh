if docker buildx ls | grep -q buildx-builder -eq 1; then
   docker buildx create --name  buildx-builder --use
fi
mkdir -p release/pi/
docker buildx build  -f DockerfilePi . \
   --platform linux/arm64 \
   --target=artifact \
   --output type=local,dest=$(pwd)/releases/pi \
   --no-cache