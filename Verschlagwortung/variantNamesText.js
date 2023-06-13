'use strict'


async function showAllVariantNames()
{
  // console.log("z ist: " + z);
  // console.log("variantNames geklickt: " + variantNames);
  // console.log("eventgargetid: " + event.target.id);
  

  if(event.target.clicked == "false")
  {
    console.log("clicked war false");
    event.target.innerHTML = event.target.variantNamesAttr;
    
    event.target.clicked = "true";
  }
  else{
    console.log("clicked war true");
    // console.log("variantNamesString: " + event.target.variantNamesString);
    event.target.clicked = "false";
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