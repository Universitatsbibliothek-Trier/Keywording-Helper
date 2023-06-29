Copyright (c) 2023 Universität Trier
Permission is hereby granted, free of charge, to any person obtaining
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.

## Hilfstool zu Verschlagwortung

Diese Web App dient als Unterstützung der Verschlagwortung von Texten jedes Zeitalters. Eine Suche ist integriert, über die die offizielle `Gemeinsame Normdateien` (GND)-Datenbank der Deutschen Nationalbibliothek (DNB) abgefragt werden kann. Die gefundenen GNDs können in einer eigenen Liste gespeichert werden.\
 Eine alternative Möglichkeit der Eintragung ist das Angeben der URI eines GND-Eintrages. Über die Anzeige der Liste der hinzugefügten GNDs kann die Anzahl erhöht oder verringert werden.\
  Das Kopieren der URI eines sich in der Liste befindlichen GND-Eintrages kann über einen `Copy`-Button erfolgen, um den Prozess des Verschlagwortens zu beschleunigen.\
  Ebenso ist ein Einfügen einer kopierten URI in ein Hinzufügenfeld möglich.

## Ausführung

### Voraussetzungen:
Voraussetzungen für das Ausführen des Programmes sind ein Browser und ein Server mit ElasticSearch, der so konfiguriert wird, dass die Web-App mit ihm kommunizieren kann.
Damit der Paste-Button funktioniert, müssen über den Browser in der Konfiguration (in Firefox: `about:config`) alle Variablen, die das Wort `Clipboard` enthalten auf true gesetzt werden.
### Starten:
Das Starten der App erfolgt über das Öffnen der Datei `ESClient.html` mit einem Browser. 


## Ordnerstruktur

**Verschlagwortung**  
Enthält JavaScript-Dateien, die zur Ausführung der Web-App dienen. Außerdem befindet sich hier die Datei `ESClient.html`, die als Einstiegspunkt dient. Diese Datei muss mit einem Browser geöffnet werden.

**Verschlagwortung/cssFiles**  
Enthält eine `.css`-Datei, die den Stil der Elemente der Web-App konfiguriert.

**Verschlagwortung/images**  
Enthält zwei `.png`-Dateien, die auf Buttons abgebildet werden.