'use strict'

let header = "GND";
let header_text =`${header} Verschlagwortungsgehilfe`;
document.getElementById('headerText').innerHTML = header_text;

// var cookies = document.cookie;
// mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button--raised'));
// const list = new MDCList(document.querySelector('.mdc-list'));
// const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));

async function getNewGND()
{
  await getGND();
  // await document.getElementById('aktualisierungsButton').click;
  setTimeout(aktualisiereListe,1000);
  // wait(7000);
  // aktualisiereListe();
}
async function getGND()
{
  
  var gndNumber = document.querySelector('.mdc-text-field').MDCTextField.value;
  
  let partURLGnd = "https://lobid.org/gnd/";  
  gndNumber = gndNumber.replace(/ /g,'');
  let URLGnd = partURLGnd + gndNumber;
  const responseGND = await fetch(URLGnd);  

  
  let partURL = "https://0.0.0.0:9200/gnd/_doc/";
  var jsonGND = await responseGND.json();
  console.log(jsonGND.gndIdentifier);
  jsonGND.vorkommen = 1;
  var gndIdentifier = jsonGND.gndIdentifier;

  const response = await fetch(partURL, 
     {
      mode: 'cors',
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify( {
        jsonGND
        //todo
      // "anzahl":  0
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

