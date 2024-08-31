#!/bin/bash

# Define variables
SERVER_USER=ec2-user
SERVER_IP=44.212.18.216
PEM_FILE="$HOME/.ssh/aws-key.pem"  # Path where the PEM file will be saved from GitHub secrets
REMOTE_PATH=/var/www/html
LOCAL_DIST_PATH="./downloaded-artifacts/dist-folder"

echo "Starting deployment..."

# Ensure the dist directory exists and has files
if [ ! -d "$LOCAL_DIST_PATH" ]; then
  echo "Error: The dist directory does not exist."
  exit 1
fi

if [ -z "$(ls -A $LOCAL_DIST_PATH)" ]; then
  echo "Error: The dist directory is empty."
  exit 1
fi

# Debugging: List files to be transferred
echo "Listing files in $LOCAL_DIST_PATH:"
ls -l $LOCAL_DIST_PATH

# Add the server's SSH key to known_hosts
ssh-keyscan -H $SERVER_IP >> ~/.ssh/known_hosts

# Transfer the files from the dist directory
scp -i "$PEM_FILE" -r $LOCAL_DIST_PATH/* $SERVER_USER@$SERVER_IP:$REMOTE_PATH/

# Debugging: Verify transfer by listing files on the server
ssh -i "$PEM_FILE" $SERVER_USER@$SERVER_IP "ls -l $REMOTE_PATH"

# Restart NGINX or Apache (depending on your server setup)
ssh -i "$PEM_FILE" $SERVER_USER@$SERVER_IP << EOF
   sudo systemctl restart nginx
   echo "Restarted NGINX server."
EOF

echo "Deployment finished!"
