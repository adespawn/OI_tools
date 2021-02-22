user=`whoami`
mkdir -p ~/.local/lib/bkpCli
rm -r -d ~/.local/bin/bkpCli
npm i
cp ./index.js ~/.local/lib/bkpCli
cp ./backup ~/.local/bin/backup
cp ./settings.json ~/.local/lib/bkpCli/settings.json
cp ./PUB.key ~/.local/lib/bkpCli/PUB.key
chmod +x ~/.local/bin/backup
cp ./package-lock.json ~/.local/lib/bkpCli
cp ./package.json ~/.local/lib/bkpCli
cp -r ./node_modules ~/.local/lib/bkpCli