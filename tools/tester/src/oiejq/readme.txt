SIO2Jail OIEJQ
==============

OI's Experiment for Judging Quickly

Wymagania:
----------

* Linux z kernelem 3.16 lub nowszym


Intrukcja użytkowania:
----------------------

1. Ściągnij narzędzie i rozpakuj archiwum, np. do `~/oiejq`

2. Otwórz terminal

3. Wejdź do katalogu z Twoim skompilowanym programem

    cd ~/oiejq/test-programs

4. Uruchom `~/oiejq/oiejq.sh`, przekazując nazwę programu jako argument.
   Możesz też przekierować standardowe wejście/wyjście, albo przekazać
   dodatkowe argumenty do programu.

    ~/oiejq/oiejq.sh ./sum-gcc48-static-O3 <sum.in

Byćmoże, żeby narzędzie działało, będziesz musiał przed pierwszym
uruchomieniem wykonać:

    sudo sysctl kernel.perf_event_paranoid=-1

albo ustawić analogiczną zmienną w `/etc/sysctl.conf`

Narzędziem powinno dać się uruchomić dowolny program,
np. interpreter pythona:

    ~/oiejq/oiejq.sh /usr/bin/python3

Licencja
--------

Skrypt wykorzystuje program SIO2Jail, którego źródła są dostępne
na licencji MIT pod adresem: 

https://github.com/sio2project/sio2jail

Szczegóły licencji znajdują się w pliku LICENSE.txt
