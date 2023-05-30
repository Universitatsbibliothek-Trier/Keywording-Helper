'use strict'



async function plusOrMinus(plusOrMinusString)
{
  if(plusOrMinusString == "plus")
  {
    await buttonPlusRaise();
  }
  else{
    await buttonMinusRaise();
  }


  // await document.getElementById('aktualisierungsButton').click;
  setTimeout(aktualisiereListe, 1000);
  // wait(7000);
  // aktualisiereListe();
}