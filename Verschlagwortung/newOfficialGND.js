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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonGND
      })
    }
  );
}


