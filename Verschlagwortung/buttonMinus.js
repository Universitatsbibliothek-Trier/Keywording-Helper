'use strict'
async function buttonMinusRaise(buttonID)
{
  var buttonIDString = buttonID.id;
  let partURL = basicURL + "_doc/" + buttonIDString;
  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     }
  );
  var jsonGNDResponse = await response.json();
  jsonGNDResponse._source.jsonGND.vorkommen = jsonGNDResponse._source.jsonGND.vorkommen - 1
  if(jsonGNDResponse._source.jsonGND.vorkommen > 0)
  {
    delete jsonGNDResponse._version;
    delete jsonGNDResponse._seq_no;
    delete jsonGNDResponse._primary_term;
    delete jsonGNDResponse.found;
    var jsonGND = Object.assign({}, jsonGNDResponse);
    delete jsonGND._source;
    for(let property in jsonGNDResponse._source.jsonGND)
    {
      jsonGND[property] = jsonGNDResponse._source.jsonGND[property];
    }
    const responseIncrement = await fetch(partURL,
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
  else
  {
    const responseDelete = await fetch(partURL,
      {
        mode: 'cors',
        credentials: "include",
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' } 
       }
    );
  }
}
