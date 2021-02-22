if [ "$EUID" -ne 0 ]
  then echo "Run as root"
  exit
fi


#install deps
sudo apt update
sudo apt -y install python3
sudo apt -y install python3-pip
sudo apt -y install npm
pip3 install memory_profiler matplotlib python-cli-ui


