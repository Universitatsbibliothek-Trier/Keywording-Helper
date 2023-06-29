'use strict'

async function keyPressed()
{
  let searchField  = event.target;
  let eingabe = searchField.value;
  if(eingabe.length > 2)
  {
    await suchenListe();
  }
  else if(eingabe.length < 1)
  {
    await aktualisiereListe();
  }  
}