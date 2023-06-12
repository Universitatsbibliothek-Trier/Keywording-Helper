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
  document.getElementById("rueckMeldung").innerHTML = "trage GND-Entität ein..."
  var gndURI = document.getElementById("gndNumber").value;
  var gndURIClean = gndURI.replace(/ /g,'');
  // https://d-nb.info/gnd/4060877-3
  var gndID = gndURIClean.substr(22, gndURIClean.length);
  // console.log("gndID abgeschnitten: " + gndID);
  let partURLGnd = "https://lobid.org/gnd/";  
  
  let URLGnd = partURLGnd + gndID;
  const responseGND = await fetch(URLGnd); 
  if((responseGND.headers.get("Content-Type") == ("text/html; charset=UTF-8")) | (responseGND.statusText =="Not Found") )
  {
    document.getElementById("rueckMeldung").innerHTML = "falsche Eingabe!";
  }
  else{
    document.getElementById("rueckMeldung").innerHTML = "GND-Entität gefunden, trage ein...";
  }
  
  let partURL = basicURL + "_doc/";
  var jsonGND = await responseGND.json();
  // console.log(jsonGND.gndIdentifier);
  jsonGND.vorkommen = 1;
  var gndIdentifier = jsonGND.gndIdentifier;

  // console.log(jsonGND);
  const response = await fetch(partURL, 
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

