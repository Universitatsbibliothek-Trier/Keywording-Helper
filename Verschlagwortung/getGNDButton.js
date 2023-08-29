'use strict'

let header = "GND";
let header_text =`${header}-Helferlein`;
document.getElementById('headerText').innerHTML = header_text;
document.getElementById("listColumn4spec").style.marginLeft = "0.0%";

async function getNewGND()
{
  document.getElementById("rueckMeldung").innerHTML = "trage GND-Entität ein..."
  await getGND();
  setTimeout(aktualisiereListe,1000);
}
async function getGND()
{
  document.getElementById("rueckMeldung").innerHTML = "Überprüfe, ob GND-Entität noch nicht existiert."
  var gndURI = document.getElementById("gndNumber").value;
  var gndURIClean = gndURI.replace(/ /g,'');
  var gndID = gndURIClean.substr(22, gndURIClean.length);
  let partGetURL = basicURL + "_search";
  const responseGet = await fetch(partGetURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify( {    
      "query": {
        "bool": {
          "filter": {
            "term": {
              "jsonGND.gndIdentifier.keyword" : gndID
            }
          }
        }
      }
     })
     }
  );

  var jsonGND = await responseGet.json();
  if(jsonGND.hits.hits.length == 0 )
  {
    document.getElementById("rueckMeldung").innerHTML = "versuche GND-Entität einzutragen..."
    let partURLGnd = "https://lobid.org/gnd/";      
    let URLGnd = partURLGnd + gndID;
    const responseGNDLobid = await fetch(URLGnd); 
    if((responseGNDLobid.headers.get("Content-Type") == ("text/html; charset=UTF-8")) | (responseGNDLobid.statusText =="Not Found") )
    {
      document.getElementById("rueckMeldung").innerHTML = "Keine GND-Entität unter der URI gefunden!";
    }
    else{
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
       body:  JSON.stringify( {
        jsonGND
      })
      }
   ); 
  }
  else{
  document.getElementById("rueckMeldung").innerHTML = "GND existiert bereits, erhöhe Anzahl"
  let jsonID = jsonGND.hits.hits[0]._id;
  jsonGND.hits.hits[0]._source.jsonGND.vorkommen = jsonGND.hits.hits[0]._source.jsonGND.vorkommen + 1;
  jsonGND = jsonGND.hits.hits[0]._source.jsonGND;
  let partLocalURL = basicURL + "_doc/" + jsonID;
      const response = await fetch(partLocalURL, 
      {
       mode: 'cors',
       credentials: "include",
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body:  JSON.stringify( {
        jsonGND
      })
      }
   ); 
  }
}