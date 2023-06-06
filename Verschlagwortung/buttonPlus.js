'use strict'



async function buttonPlusRaise(buttonID)
{

  var gndNumber = document.querySelector('.mdc-text-field').MDCTextField.value;

  var buttonIDString = buttonID.id;
  // console.log("Element ist: " + buttonID);
  // console.log("ID von Element ist: " + buttonID.id);
  // let partURLGnd = "https://lobid.org/gnd/";
  // gndNumber = gndNumber.replace(/ /g, '');
  // let URLGnd = partURLGnd + gndNumber;
  // const responseGND = await fetch(URLGnd);

  // var source = event.target;
  let partURL = basicURL + "_doc/" + buttonIDString;
  // var jsonGND = await responseGND.json();
  // console.log(jsonGND.gndIdentifier);
  // jsonGND.vorkommen = 1;
  // var gndIdentifier = jsonGND.gndIdentifier;


  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      // auth: { username: 'ackels', password: 'blkmgr' },
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({

    //     "query": {
    //       "match_all": {}
    //     }

    //   })
     }
  );

  var jsonGNDResponse = await response.json();
  console.log(jsonGNDResponse._source.jsonGND.gndIdentifier);
  // console.log(jsonGND._source.jsonGND.vorkommen);
  // const response = await fetch(partURL,
  //   {
  //     mode: 'cors',
  //     credentials: "include",
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       jsonGND
  //     })
  //   }
  // );
  let partURLIncrement = basicURL + "_doc/" + buttonIDString;
  // console.log(jsonGNDResponse._source.jsonGND.vorkommen);
  jsonGNDResponse._source.jsonGND.vorkommen = jsonGNDResponse._source.jsonGND.vorkommen + 1;
  // console.log(jsonGNDResponse._source.jsonGND.vorkommen);
  
  delete jsonGNDResponse._version;
  delete jsonGNDResponse._seq_no;
  delete jsonGNDResponse._primary_term;
  delete jsonGNDResponse.found;
  // console.log(jsonGNDResponse);

  var jsonGND = Object.assign({}, jsonGNDResponse);
  // console.log(jsonGND);
  // console.log(jsonGND);
  delete jsonGND._source;
  // console.log(jsonGNDResponse._source)
  // console.log(jsonGND.gndIdentifier);
  for(let property in jsonGNDResponse._source.jsonGND)
  {
    jsonGND[property] = jsonGNDResponse._source.jsonGND[property];
  }
  // console.log(jsonGND);
  // console.log(jsonGND.vorkommen);
  // console.log(jsonGND.gndIdentifier);
  const responseIncrement = await fetch(partURLIncrement,
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
