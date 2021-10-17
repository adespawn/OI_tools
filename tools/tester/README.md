# online_tester
Narzędzie do porówywania swojego rozwiązania względem przygotowanych testów online

# Wymagania:
- System operacyjny: linux (aby uruchomić na windowsie należy robić to przy użyciu wsl (https://docs.microsoft.com/en-us/windows/wsl/install-win10))
- Zainstalowane aplikacje: g++ node npm
# Jak używać:
- Przed pierwszym uruchomieniem należy uruchomić plik first_launch 
( ``sh first_launch.sh`` ) w celu instalacji oraz kompilacji poszczególnych fragmentow sprawdzarki
- Należy dostosować ustawienia programu w pliku ``/var/tester/settings.json``
- Po instalacji należy wywołać komędę ``tester`` w celu rozpoczęcia testowania. Program automatycznie wykryje testy i zacznie sprawdzanie

# Flagi programu
- ``-d`` - ścieżka do testów (miejsce gdzie znajdują się folderi ./in i ./out)
- ``-b`` - ścieżka do skompliowanego rozwiązania (domyślnie ``a.out``)
- ``-c`` - ścieżka do kodu źródłowego rozwiązania (domyślnie brak). Flaga ta nie może być równolegle użyta z ``-b``