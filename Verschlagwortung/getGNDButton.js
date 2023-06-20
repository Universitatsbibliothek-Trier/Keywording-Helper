'use strict'

let header = "GND";
let header_text =`${header}-Helferlein`;
document.getElementById('headerText').innerHTML = header_text;

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
    // https://d-nb.info/gnd/4060877-3
  var gndID = gndURIClean.substr(22, gndURIClean.length);
  console.log("suche nach dieser gnd-nummer: " + gndID);
  let partGetURL = basicURL + "_search";
  const responseGet = await fetch(partGetURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify( {
      //   "query" : 
      // { 
      //   "constant_score" : {
      //     "filter" : {
      //         "match": { "jsonGND.gndIdentifier" : gndID }
      //     }
      // }
           

      "query": {
        "bool": {
          "filter": {
            "term": {
              "jsonGND.gndIdentifier.keyword" : gndID
            }
          }
        }
      }

      // "match" :
      //        {
      //         "jsonGND.gndIdentifier" : gndID
      //        }   


      // }

       
     })
     }
  );

  var jsonGND = await responseGet.json();
  console.log("jsonGND hits array: " + jsonGND.hits.hits);
  // console.log("jsonGND score ist: " + jsonGND.hits.hits[0]._score);

  if(jsonGND.hits.hits.length == 0 )
  {
    document.getElementById("rueckMeldung").innerHTML = "trage GND-Entität ein..."
    console.log("jsonGND-Länge: " + jsonGND.hits.hits.length);
    console.log("keine GND-Entität gefunden!");
    
    
    // console.log("gndID abgeschnitten: " + gndID);
    let partURLGnd = "https://lobid.org/gnd/";  
    
    let URLGnd = partURLGnd + gndID;
    const responseGNDLobid = await fetch(URLGnd); 
    if((responseGNDLobid.headers.get("Content-Type") == ("text/html; charset=UTF-8")) | (responseGNDLobid.statusText =="Not Found") )
    {
      document.getElementById("rueckMeldung").innerHTML = "falsche Eingabe!";
    }
    else{
      document.getElementById("rueckMeldung").innerHTML = "GND-Entität gefunden, trage ein...";
    }
    

    jsonGND = await responseGNDLobid.json();
    // var jsonGNDLobid = await jsonGNDLobidResponse.json;
    console.log("response von lobid: " + jsonGND);
    console.log("gndidentifier von lobid: " + jsonGND.gndIdentifier);
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
    // var gndIdentifier = jsonGNDLobid.gndIdentifier;
  }
  else{
  console.log("eintrag existiert bereits");
  console.log(jsonGND);
  document.getElementById("rueckMeldung").innerHTML = "GND existiert bereits, erhöhe Anzahl"
  console.log("hit in response ist: " + jsonGND.hits.hits[0]._source.jsonGND.gndIdentifier);
  let jsonID = jsonGND.hits.hits[0]._id;
  console.log("_id von json ist " + jsonGND.hits.hits[0]._id);
  console.log("vorkommen ist " + jsonGND.hits.hits[0]._source.jsonGND.vorkommen);
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









  // partURL = ("https://0.0.0.0:9200/gnd/_refresh");
  // const responseRefresh = await fetch(partURL, 
  //   {
  //    mode: 'cors',
  //    credentials: "include",
  //    method: 'POST'
  //   //  headers: { 'Content-Type': 'application/json' }
  //   })
  //    ; 
}
    // Trier GND: 4060877-3
    // Amphitheater: 1137516623
    // Porta Nigra: 4474732-9
    // Göthe: 118540238


// async function putFromElastic()
// {

//   // document.querySelector('[aria-label="gndNumber"]').MDCTextField.disabled = false;
//   // var gndNumber = document.querySelector('.mdc-text-field').MDCTextField.value;
  
//   // let partURL = "https://0.0.0.0:9200/customer/_doc/1?pretty";  
//   let partURL = "https://0.0.0.0:9200/customer/_doc/3?pretty";  
//   // let partURL = "https://es01.bib55.uni-trier.de/_search?pretty";  
//   // let partURL = "http://lobid.org/gnd/4074335-4";  
//   // let partURL = "https://0.0.0.0:9200";  
//   // let URL = partURL + gndNumber;
//   // partURL = partURL.replace(/ /g,'');
  
//   // const httpsAgent = new https.Agent({
//   //   rejectUnauthorized: false,
//   // });
// //   const requestOptions = {
// //     method: 'PUT',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify( {
// //       "firstname":  "Peter"
// //     })
// // };

//   const response = await fetch(partURL, 
//      {
//       mode: 'cors',
//       // agent: httpsAgent,
//     // method: "GET", 
//     // auth: { username: 'ackels', password: 'blkmgr' },// *GET, POST, PUT, DELETE, etc.
//     credentials: "include",
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify( {
//       "firstname":  "Peter"
//     }) // include, *same-origin, omit
//     // headers: {
//     //   "Content-Type": "application/json",
//     //   // 'Content-Type': 'application/x-www-form-urlencoded',
//     // },
//     // body: JSON.stringify(data), // body data type must match "Content-Type" header
//    }
//   ); 

//   console.log(response);
//   const commits = await response.json();  
//   // document.querySelector('.mdc-text-field').MDCTextField.value = "";


//   // document.getElementById('preferredName').innerHTML = commits._source.firstname;
//   // document.getElementById('variantName').innerHTML = commits._source.lastname;


//   // const textField = new MDCTextField(document.querySelector('[aria-label="gndNumber"]'));
//   // console.log(gndNumber);

//     // Trier GND: 4060877-3
// }

