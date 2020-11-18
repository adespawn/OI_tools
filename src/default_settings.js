//Domyślne ustawienia programu sprawdzającego
module.exports ={
    settings:`{       "_program_description":"program który będzie wykonywał rozwiązanie",
    "program":"user_program/a",
    "_threads_description":"liczba wątków w których ma działać program sprawdzający. Ustawić najlepiej na 1.5x liczbą wątków procesora ",
    "threads": 12,
    "_download_description":"Czy program sprawdzający ma pobierać testy z zewnętrznego serwera (true), czy ma korzystać z lokalnych testów (false)[work in progres]",
    "download":false,
    "_test_dir_description":"Ścieżka do testów jeżeli w 'download' zaznaczono false, w przeciwnym wypadku progrm ignoruje tą wartość. Dana ścieżka powinna zawierać foldery in i out z testami",
    "test_dir":"./testy/runtime",
    "_use_oiejq_description":"Czy używać oiejq (jest dołaczone do projektu- nie wymaga dodadkowej instalacji) do mieżenia czasu działania programu",
    "use_oiejq":false,
    "wrong_skip":10,
    "_progres_update_description":"Co ile ukończonych testów program powinien informować o postępie",
    "progres_update":100
}`,
test_settings:`{
    "quantity":600,
    "prefix":"cuk",
    "in_ext":".in",
    "out_ext":".out"
}`
}