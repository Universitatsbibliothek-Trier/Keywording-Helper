'use strict'

async function plusOrMinus(plusOrMinusString)
{
  let buttonID  = event.target;
  if(plusOrMinusString == "plus")
  {
    document.getElementById("rueckMeldung").innerHTML = "erhöhe Anzahl um 1..."
    await buttonPlusRaise(buttonID);
  }
  else{
    document.getElementById("rueckMeldung").innerHTML = "verringere Anzahl um 1..."
    await buttonMinusRaise(buttonID);
  }
  setTimeout(aktualisiereListe, 1000);
}

async function copyToClipboard()
{
  
}