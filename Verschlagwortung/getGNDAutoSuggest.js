'use strict'

async function getOfficialGND()
{
  let partURLGnd = "https://lobid.org/gnd/search?q=preferredName%3A";
  let gndEingabe = document.getElementById('officialGND').value;
  let URLGnd = partURLGnd + gndEingabe + "&format=json&size=50";
  const responseGNDLobid = await fetch(URLGnd);
  let jsonGND = await responseGNDLobid.json();
  await createOfficialGNDList(jsonGND);
}