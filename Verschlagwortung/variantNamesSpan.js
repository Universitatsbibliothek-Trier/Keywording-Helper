'use strict'


async function showAllVariantSpan()
{
  // console.log("z ist: " + z);
  // console.log("variantNames geklickt: " + variantNames);
  // console.log("eventgargetid: " + event.target.id);
  var esID = event.target.id;

  // console.log("esID ist: " + esID);
  console.log("spaneventhandler: " + esID);


  var spanID = esID.substring(4,esID.length);
  console.log("spanID für Button: " + spanID);
  var ButtonElement = document.getElementById(spanID);
  console.log("ButtonElement ist:  " + ButtonElement);

  var spanElementID = esID.replace("spanes","span");
  var spanElement = document.getElementById(spanElementID);

  // console.log("spanID ist: " + spanID);
  // console.log("spanElement ist: " + spanElement);

  if(event.target.clicked == "false")
  {
    console.log("clicked war false");
    
    event.target.innerHTML = "remove";
    spanElement.innerHTML = spanElement.variantNamesAttr;
    
    event.target.clicked = "true";
    spanElement.clicked = "true";
    ButtonElement.clicked = "true";
  }
  else{
    console.log("clicked war true");
    // console.log("variantNamesString: " + event.target.variantNamesString);
    console.log("change element1");
    event.target.clicked = "false";
    spanElement.clicked = "false";
    ButtonElement.clicked = "false";
    event.target.innerHTML = "add";
    console.log("change element2");
    if(spanElement.variantNamesString.length < 50)
    {
      spanElement.innerHTML = spanElement.variantNamesString;
    }
    else{
      spanElement.innerHTML = spanElement.variantNamesString;
    }

  }
  // variantNamesString
  // alert("variantNames geklickt");
  // navigator.clipboard.writeText(event.target.id);
  // document.getElementById("rueckMeldung").innerHTML = "GND-URI kopiert.";
}