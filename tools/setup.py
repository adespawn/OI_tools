import ui
import os
import subprocess

tools = ['compiler','diff','memcheck','backup-server','backup-client','quit']

while 1:
    out = ui.ask_choice('Co zainstalować?',tools)
    if out == 'quit':
        exit()
    if out=='compiler':
        ui.info_2('installing')
        os.system(f'bash -c "cd  {   os.path.dirname(os.path.abspath(__file__))  }/compiler++ && source compile.sh" ')
        #subprocess.run(['sh','./compiler++/compile.sh'],)
        ui.info_2('Zainstalowano - od teraz można w terminalu uzyć komendy c [nazwaprogramu]')
    if out=='backup-client':
        ui.info_2('installing')
        os.system(f'bash -c "cd  { os.path.dirname(os.path.abspath(__file__))  }/backup/client"')
        ip=ui.ask_string('podaj ip serwera backupowego, dla lokalnego wpisz 127.0.0.1')
        port = ui.ask_string('podaj port serwera backupowego')
        pswd = ui.ask_password('podaj haslo do serwera backupowego (ustawisz je przy instalacji serwera)')
        f = open(  os.path.dirname(os.path.abspath(__file__))+'/backup/client/settings.json','w+')
        f.write(  f'{{ \n  "server":"{ip}", \n "port":{port}, \n "pass":"{pswd}" \n }}'  )
        f.close()
        os.system(f'bash -c "cd  {   os.path.dirname(os.path.abspath(__file__))  }/backup/client && source compile.sh"')
        #subprocess.run(['sh','./compiler++/compile.sh'],)
        ui.info_2('Zainstalowano - od teraz można w terminalu uzyć komendy c [nazwaprogramu]')