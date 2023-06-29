'use strict'

async function getOfficialGND()
{
  let partURLGnd = "https://lobid.org/gnd/search?q=";
  let gndEingabe = document.getElementById('officialGND').value;
  let URLGnd = partURLGnd + gndEingabe + "&format=json:preferredName";
  const responseGNDLobid = await fetch(URLGnd);
  let jsonGND = await responseGNDLobid.json();
  await createOfficialGNDList(jsonGND);
}