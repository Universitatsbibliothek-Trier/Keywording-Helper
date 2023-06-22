'use strict'

async function plusOrMinusOfficial(plusOrMinusString)
{
  let buttonID  = event.target;
  if(plusOrMinusString == "plus")
  {
    document.getElementById("rueckMeldung").innerHTML = "Erhöhe Anzahl um 1."
    await buttonPlusRaiseOfficial(buttonID);
  }
  else{
    document.getElementById("rueckMeldung").innerHTML = "Verringere Anzahl um 1."
    await buttonMinusOfficial(buttonID);
  }
  setTimeout(aktualisiereListe, 1000);
}