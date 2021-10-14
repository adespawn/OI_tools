# rm ~/.local/lib/tester/* -rd
npm i
g++ ./src/compare.cpp -o ./src/compare
sudo mkdir /var/tester/ -p
sudo cp * /var/tester/ -Ru
sudo chmod -R 777 /var/tester/
chmod +x tester.sh
cp tester.sh ~/.local/bin/tester
sudo cp tester.sh /bin/tester
