'use strict'



async function buttonMinusRaise()
{

  var gndNumber = document.querySelector('.mdc-text-field').MDCTextField.value;

  let partURLGnd = "https://lobid.org/gnd/";
  gndNumber = gndNumber.replace(/ /g, '');
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
      body: JSON.stringify({
        jsonGND
      })
    }
  );

}
