# online_tester
Narzędzie do porówywania swojego rozwiązania względem przygotowanych testów online

# Wymagania:
- System operacyjny: linux (aby uruchomić na windowsie należy robić to przy użyciu wsl (https://docs.microsoft.com/en-us/windows/wsl/install-win10))
- Zainstalowane aplikacje: g++ node npm
# Jak używać:
- Przed pierwszym uruchomieniem należy uruchomić plik first_launch 
( ``sh first_launch.sh`` ) w celu instalacji oraz kompilacji poszczególnych fragmentow sprawdzarki
- Aby przetestować program należy uruchomić ``sh RUN_ME.sh`` (lub ``npm start``). Program bazuje na podstawie ustawień : Plik ``settings.json`` odpowiada za ustawienia personalne, natomiast plik ``task_settings.json`` odpowiada za ustawienia paczki testów. Pliki ustawień zostaną automatycznie wygengerowane przy pierwszym uruchomieniu sprawdzarki
