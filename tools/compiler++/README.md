# Compiler++
Narzędzie do kompilacji i automatycznego uruchomienia skompilowanego programu
Kompilacja używa dodatkowych flag:
``-Wall -Wextra -pedantic -std=c++17 -O2 -Wshadow -Wformat=2 -Wfloat-equal -Wlogical-op -Wshift-overflow=2 -Wduplicated-cond -Wcast-qual -Wcast-align -D_GLIBCXX_DEBUG -D_GLIBCXX_DEBUG_PEDANTIC -D_FORTIFY_SOURCE=2 -fsanitize=address -fsanitize=undefined -fno-sanitize-recover -fstack-protector`` ([https://codeforces.com/blog/entry/15547](https://codeforces.com/blog/entry/15547 "https://codeforces.com/blog/entry/15547"))
Kompilator wywołuje również program backupujacy kompilowany program:
 (``gnome-terminal -- node ~/.local/bin/bkpCli/index.js ${mydir}_$1  $PWD/$1``)
## Instalacja 
Aby zainstalować compiler należy wywołać komendę
``sh compile.sh``
w folderze 
## Używanie
w terminalu należy wywołać komendę 
``c programDoKompilacji.cpp``
dany program zostanie automatycznie skompilowany a następnie uruchomiony. Po zakończonej kompilacji wyświetli się informacja o sukcesie, lub błędach w przypadku nieskutecznej kompilacji
### Dodatkowe flagi:
- -h / --help : wyświetla pomoc
- -l : umieszcza skompilowany program w tym samym folderze co kompilowany kod
- -nf : kompiluje bez dodatkowych flag
- -nb : nie robi backupu (https://github.com/adespawn/OI_tools/tree/main/tools/backup)
