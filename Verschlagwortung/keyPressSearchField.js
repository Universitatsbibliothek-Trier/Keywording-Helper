'use strict'

async function keyPressed()
{
  let searchField  = event.target;
  var eingabe = searchField.value;
  // console.log("eingegebener Key ist: " + event.keyCode);
  // console.log("eingegebene Buchstaben sind: " + eingabe);
  if(eingabe.length > 2)
  {
    await suchenListe();
  }
  else if(eingabe.length < 1)
  {
    aktualisiereListe();
  }

  
}