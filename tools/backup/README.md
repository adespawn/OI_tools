# Backup 
Narzędzie do backupowania plików. Składa się z 2 części serwera: odpowiedzialnego za zapisywanie backupów oraz clienta: odpowiedzialnego za wysyłanie backupów 
## instalacja
Serwer oraz  client: należy mieć zainstalowane node oraz npm 
Serwer: Należy zainstalować wymagane pakiety komendą ``npm i``
Client: Należy w pliku index.js ustawić adres ip serwera a następnie uruchomić ``sh compile.sh``
## używanie
Serwer: należy uruchomić plik index.js
Client: należy wywołać `backup plikDoBackupu` 
Pliki będą również automatycznie backupowane przy użyciu [compiler++](https://github.com/adespawn/OI_tools/tree/main/tools/compiler%2B%2B "compiler++")
