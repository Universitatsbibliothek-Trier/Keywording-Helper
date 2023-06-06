'use strict'



async function plusOrMinus(plusOrMinusString)
{
  let buttonID  = event.target;
  // plusOrMinusString = this.options[this.selectedIndex].value;
  // var htmlString = HTMLElement.id + " thats the id";
  console.log("id von event.target ist: " + buttonID.id);
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