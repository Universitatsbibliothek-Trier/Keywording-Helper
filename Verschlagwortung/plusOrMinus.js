'use strict'



async function plusOrMinus(plusOrMinusString)
{
  // plusOrMinusString = this.options[this.selectedIndex].value;
  // console.log(plusOrMinusString);
  if(plusOrMinusString == "plus")
  {
    document.getElementById("rueckMeldung").innerHTML = "erhöhe Anzahl um 1..."
    await buttonPlusRaise();
  }
  else{
    document.getElementById("rueckMeldung").innerHTML = "verringere Anzahl um 1..."
    await buttonMinusRaise();
  }



  setTimeout(aktualisiereListe, 1000);

}