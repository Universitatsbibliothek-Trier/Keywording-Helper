'use strict'

async function plusOrMinus(plusOrMinusString)
{
  let buttonID  = event.target;
  if(plusOrMinusString == "plus")
  {
    document.getElementById("rueckMeldung").innerHTML = "Erhöhe Anzahl um 1."
    await buttonPlusRaise(buttonID);
  }
  else{
    document.getElementById("rueckMeldung").innerHTML = "Verringere Anzahl um 1."
    await buttonMinusRaise(buttonID);
  }
  setTimeout(aktualisiereListe, 1000);
}