/* @author       René Ackels
   Copyright (c) 2023 Universität Trier

   This file is part of OCR-To-TEI.

   OCR-To-TEI is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   OCR-To-TEI is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.*/
   
'use strict'

async function getNewGNDOfficial()
{
  document.getElementById("rueckMeldung").innerHTML = "trage GND-Entität ein..."
  await getGNDOfficial();
  setTimeout(aktualisiereListe, 1000);
}
async function getGNDOfficial()
{
  document.getElementById("rueckMeldung").innerHTML = "Überprüfe, ob GND-Entität noch nicht existiert."
  var gndID = event.target.id;
  document.getElementById("rueckMeldung").innerHTML = "trage GND-Entität ein..."
  let partURLGnd = "https://lobid.org/gnd/";
  let URLGnd = partURLGnd + gndID;
  const responseGNDLobid = await fetch(URLGnd);
  if ((responseGNDLobid.headers.get("Content-Type") == ("text/html; charset=UTF-8")) | (responseGNDLobid.statusText == "Not Found"))
  {
    document.getElementById("rueckMeldung").innerHTML = "Eintragung fehlgeschlagen!";
  }
  else
  {
    document.getElementById("rueckMeldung").innerHTML = "GND-Entität gefunden, trage ein...";
  }
  jsonGND = await responseGNDLobid.json();
  jsonGND.vorkommen = 1;
  let partLocalURL = basicURL + "_doc/";
  const response = await fetch(partLocalURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa( user + ':' + pass )  },
      body: JSON.stringify({
        jsonGND
      })
    }
  );
}


