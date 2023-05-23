var { Client } = require('elasticsearch');

var client = new Client({
  node: 'https://localhost:9200',
  auth: { username: 'ackels', password: 'blkmgr' },
  tls: {
    // ca: fs.readFileSync('./http_ca.crt'),
    rejectUnauthorized: false
  }
});

let header = "GND";
let header_text =`${header} Verschlagwortungsgehilfe`;
// document.getElementById('headerText').innerHTML = header_text;

async function getGND()
{

  // document.querySelector('[aria-label="gndNumber"]').MDCTextField.disabled = false;
  var gndNumber = document.querySelector('.mdc-text-field').MDCTextField.value;
  
  let partURL = "https://lobid.org/gnd/";  
  let URL = partURL + gndNumber;
  URL = URL.replace(/ /g,'');
  // console.log(URL);

  const response = await fetch(URL);  
  const commits = await response.json();  
  // document.querySelector('.mdc-text-field').MDCTextField.value = "";


  // document.getElementById('preferredName').innerHTML = commits.preferredName;
  // document.getElementById('variantName').innerHTML = commits.variantName;


  // const textField = new MDCTextField(document.querySelector('[aria-label="gndNumber"]'));
  // console.log(gndNumber);

    // Trier GND: 4060877-3
}

async function getFromElastic()
{

  // document.querySelector('[aria-label="gndNumber"]').MDCTextField.disabled = false;
  // var gndNumber = document.querySelector('.mdc-text-field').MDCTextField.value;
  
  let partURL = "https://0.0.0.0:9200/customer/_doc/1?pretty";  
  // let partURL = "https://es01.bib55.uni-trier.de/_search?pretty";  
  // let partURL = "http://lobid.org/gnd/4074335-4";  
  // let partURL = "https://0.0.0.0:9200";  
  // let URL = partURL + gndNumber;
  // partURL = partURL.replace(/ /g,'');
  
  // const httpsAgent = new https.Agent({
  //   rejectUnauthorized: false,
  // });

  const response = await fetch(partURL, 
     {
      mode: 'cors',
      // agent: httpsAgent,
    // method: "GET", 
    // auth: { username: 'ackels', password: 'blkmgr' },// *GET, POST, PUT, DELETE, etc.
    credentials: "include", // include, *same-origin, omit
    // headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
   }
  ); 
  console.log(response);
  const commits = await response.json();  
  // document.querySelector('.mdc-text-field').MDCTextField.value = "";


  // document.getElementById('preferredName').innerHTML = commits._source.firstname;
  // document.getElementById('variantName').innerHTML = commits._source.lastname;


  // const textField = new MDCTextField(document.querySelector('[aria-label="gndNumber"]'));
  // console.log(gndNumber);

    // Trier GND: 4060877-3
}



