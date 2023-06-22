'use strict'

async function showAllVariantNames()
{
  var idString = event.target.id;
  idString = idString.substring(4, idString.length);
  var buttonIDString = "es" + idString;
  var buttonSpanIDString = "spanes" + idString;
  var buttonElement = document.getElementById(buttonIDString);
  var spanButtonElement = document.getElementById(buttonSpanIDString);
  if(event.target.clicked == "false")
  {
    event.target.innerHTML = event.target.variantNamesAttr;
    event.target.clicked = "true";
    buttonElement.clicked = "true";
    spanButtonElement.clicked = "true";
    spanButtonElement.innerHTML = "remove";
  }
  else{
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
}