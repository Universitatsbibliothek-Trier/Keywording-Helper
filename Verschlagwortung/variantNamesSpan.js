'use strict'

async function showAllVariantSpan()
{
  var esID = event.target.id;
  var spanID = esID.substring(4,esID.length);
  var ButtonElement = document.getElementById(spanID);
  var spanElementID = esID.replace("spanes","span");
  var spanElement = document.getElementById(spanElementID);
  if(event.target.clicked == "false")
  {
    event.target.innerHTML = "remove";
    spanElement.innerHTML = spanElement.variantNamesAttr;
    event.target.clicked = "true";
    spanElement.clicked = "true";
    ButtonElement.clicked = "true";
  }
  else{
    event.target.clicked = "false";
    spanElement.clicked = "false";
    ButtonElement.clicked = "false";
    event.target.innerHTML = "add";
    if(spanElement.variantNamesString.length < 50)
    {
      spanElement.innerHTML = spanElement.variantNamesString;
    }
    else{
      spanElement.innerHTML = spanElement.variantNamesString;
    }
  }
}