#!/bin/bash

#remove the lock
set +e
sudo rm /var/lib/dpkg/lock > /dev/null
sudo rm /var/cache/apt/archives/lock > /dev/null
sudo dpkg --configure -a
set -e

sudo apt-get update -y > /dev/null
sudo apt-get install -y ruby1.9.1-dev > /dev/null
sudo apt-get install -y build-essential curl > /dev/null
sudo gem install remote_syslog

#make sure comet folder exists
sudo mkdir -p /opt/nodemiral/logger

#initial permission
sudo chown -R $USER /etc/init
sudo chown -R $USER /opt/nodemiral/logger