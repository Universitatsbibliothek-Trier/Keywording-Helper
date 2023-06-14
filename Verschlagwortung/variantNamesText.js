'use strict'


async function showAllVariantNames()
{
  // console.log("z ist: " + z);
  // console.log("variantNames geklickt: " + variantNames);
  console.log("eventtargetid: " + event.target.id);
  var idString = event.target.id;
  idString = idString.substring(4, idString.length);
  var buttonIDString = "es" + idString;
  var buttonSpanIDString = "spanes" + idString;
  console.log("buttonSpanIDString: " + buttonSpanIDString);
  var buttonElement = document.getElementById(buttonIDString);
  var spanButtonElement = document.getElementById(buttonSpanIDString);
  if(event.target.clicked == "false")
  {
    console.log("clicked war false");
    event.target.innerHTML = event.target.variantNamesAttr;
    
    event.target.clicked = "true";
    buttonElement.clicked = "true";
    // buttonElement.clicked = "true";
    spanButtonElement.clicked = "true";
    spanButtonElement.innerHTML = "remove";

  }
  else{
    console.log("clicked war true");
    // console.log("variantNamesString: " + event.target.variantNamesString);
    event.target.clicked = "false";
    buttonElement.clicked = "false";
    spanButtonElement.clicked = "false";
    spanButtonElement.innerHTML = "add";
    if(event.target.variantNamesString.length < 50)
    {
      event.target.innerHTML = event.target.variantNamesString;
    }
    else{
      event.target.innerHTML = event.target.variantNamesString;
    }

  }
  // variantNamesString
  // alert("variantNames geklickt");
  // navigator.clipboard.writeText(event.target.id);
  // document.getElementById("rueckMeldung").innerHTML = "GND-URI kopiert.";
}