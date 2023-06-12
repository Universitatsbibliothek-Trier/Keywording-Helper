'use strict'


async function showAllVariantNames(variantNames)
{
  console.log("variantNames geklickt");
  console.log("evetgargetid: " + event.target.id);
  event.target.innerHTML = variantNames;
  // alert("variantNames geklickt");
  // navigator.clipboard.writeText(event.target.id);
  // document.getElementById("rueckMeldung").innerHTML = "GND-URI kopiert.";
}