# Docker file used to spin up a MongoDB server for automated testing
FROM ubuntu:20.04

# Install MongoDB
RUN apt-get update && apt-get install -y mongodb

# Create a directory for MongoDB data
RUN mkdir -p /data/db

# Expose the default MongoDB port
EXPOSE 27017

# Start MongoDB when the container is launched
CMD ["mongod"]