user=`whoami`
mkdir -p ~/.local/bin/bkpCli
npm i
cp ./index.js ~/.local/bin/bkpCli
cp ./backup.sh ~/.local/bin/backup
chmod +x ~/.local/bin/backup
cp ./package-lock.json ~/.local/bin/bkpCli
cp ./package.json ~/.local/bin/bkpCli
cp -r ./node_modules ~/.local/bin/bkpCli