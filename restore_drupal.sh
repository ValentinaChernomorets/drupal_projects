#!/bin/bash

# Settings
DB_CONTAINER="db"
DRUPAL_CONTAINER="drupal"
DB_USER="drupal"
DB_PASSWORD="drupal"
DB_NAME="drupal"

# The files of backup
DB_BACKUP="$1"
FILES_BACKUP="$2"

if [[ -z "$DB_BACKUP" || -z "$FILES_BACKUP" ]]; then
  echo "Use: $0 <backup_db.sql> <backup_files.tar.gz>"
  exit 1
fi

echo "=== Rebuilding Drupal project ($(date)) ==="

# 1. Recovery data base
echo "[1/2] Recovery data base..."
cat $DB_BACKUP | docker exec -i $DB_CONTAINER mysql -u$DB_USER -p$DB_PASSWORD $DB_NAME
echo " → The data base is rebuild $DB_BACKUP"

# 2. Recovery Drupal files
echo "[2/2] recovery the files..."
docker cp $FILES_BACKUP $DRUPAL_CONTAINER:/tmp/
docker exec $DRUPAL_CONTAINER rm -rf /var/www/html/*
docker exec $DRUPAL_CONTAINER tar -xzf /tmp/$(basename $FILES_BACKUP) -C /var/www/html
docker exec $DRUPAL_CONTAINER rm /tmp/$(basename $FILES_BACKUP)
echo " → The files was recovered $FILES_BACKUP"

echo "=== The recivery was ended success! ==="
