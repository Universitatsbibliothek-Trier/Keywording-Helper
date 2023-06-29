'use strict'

async function keyPressedOfficial()
{
  let searchField  = event.target;
  let eingabe = searchField.value;
  if(eingabe.length > 1)
  {
    await getOfficialGND();
  }
  else if(eingabe.length < 1)
  {
    await aktualisiereListe();
  }  
}