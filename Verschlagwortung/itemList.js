'use strict'

// var ulElement = document.createElement("ul");
// ulElement.id = "unorderedList";
var jsonGND;
var jsonGNDsorted;
async function aktualisiereListe()
{
  document.getElementById("rueckMeldung").innerHTML = "aktualisiere Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");

  if (nodeList.hasChildNodes())
  {
    nodeList.removeChild(nodeList.children[0]);
  }

  const listBeginning = document.createElement("ul");
  listBeginning.id = "unorderedList";
  nodeList.insertAdjacentElement("afterbegin", listBeginning);
  listBeginning.classList.add('mdc-image-list');

  let partURL = basicURL + "_search?size=10000";

  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },

      searchField
    }
  );

  jsonGND = await response.json();
  jsonGNDsorted = JSON.parse(JSON.stringify(jsonGND));
  // var jsonGNDsorted = jsonGND.hits.hits.sort((jsonGNDobject1, jsonGNDobject2) => (jsonGNDobject1._source.jsonGND.vorkommen > jsonGNDobject2._source.jsonGND.vorkommen) ? 1 : (jsonGNDobject1._source.jsonGND.vorkommen < jsonGNDobject2._source.jsonGND.vorkommen) ? -1 : 0);
  let x;
  let y;
  var biggestVorkommen = 0;
  var biggestVorkommenIndex = 0;
  for (y = 0; (y < jsonGNDsorted.hits.hits.length); y++)
  {
    jsonGNDsorted.hits.hits[y]._source.jsonGND.vorkommen = 0;
    for (x = 0; (x < jsonGND.hits.hits.length); x++)
    {
      if (biggestVorkommen < jsonGND.hits.hits[x]._source.jsonGND.vorkommen)
      {
        biggestVorkommenIndex = x;
        biggestVorkommen = jsonGND.hits.hits[x]._source.jsonGND.vorkommen;
      }
    }
    if (jsonGNDsorted.hits.hits[y]._source.jsonGND.vorkommen < biggestVorkommen)
    {
      jsonGNDsorted.hits.hits[y] = jsonGND.hits.hits[biggestVorkommenIndex];
      jsonGND.hits.hits.splice(biggestVorkommenIndex, 1);
      biggestVorkommen = 0;
    }
  }

  var z = parseInt(jsonGNDsorted.hits.hits.length) - 1;
  for (let x in jsonGNDsorted.hits.hits)
  {
    // sortierfunktion nach Anzahl einbauen
    createButton(listBeginning, "minus", z);
    createButton(listBeginning, "plus", z);

    const listVorkommen = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listVorkommen);
    listVorkommen.classList.add('mdc-list-item');
    listVorkommen.id = "listColumn4";
    const spanVorkommen = document.createElement("span");
    listVorkommen.appendChild(spanVorkommen);
    spanVorkommen.innerHTML = jsonGNDsorted.hits.hits[z]._source.jsonGND.vorkommen;

    const listItemAlterName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemAlterName);
    listItemAlterName.classList.add('mdc-list-item');
    listItemAlterName.id = "listColumn3";
    var spanAlterName = document.createElement("span");
    spanAlterName.id=jsonGNDsorted.hits.hits[z]._id;
    listItemAlterName.appendChild(spanAlterName);
    var variantNames = jsonGNDsorted.hits.hits[z]._source.jsonGND.variantName;
    // console.log("variantNames: " + variantNames);
    spanAlterName.variantNamesAttr = variantNames;
    spanAlterName.clicked = "false";
    // console.log("z ist: " + z);
    spanAlterName.addEventListener("click", function () { showAllVariantNames() });
    // spanAlterName.addEventListener("click", function (){showAllVariantNames(variantNames)});
    // buttonPlus.addEventListener("click", function () { plusOrMinus(plusOrMinusString) });
 
    if(!(variantNames === undefined))
    {
      console.log("Variantennamenlänge: " + variantNames.toString().length);
      console.log("ist nicht undefined");
    }
    // spanAlterName.visibility = 'hidden';
    var variantNamesString = "";
    if(((!(variantNames === undefined))) && ((variantNames.toString()).length >50))
    {
      let y = 0;
      for(; y < variantNames.length; y++)
      {
        // console.log("y ist: " + y);
        if(y == 0)
        {
          variantNamesString = variantNamesString + variantNames[y];
        }
        else{
          variantNamesString = variantNamesString + ";"  + variantNames[y];
        }
        
        if(variantNamesString.length > 50 && (y<variantNames.length) )
        {
          // variantNamesString = variantNamesString - variantNamePart;
          spanAlterName.innerHTML = variantNamesString + " +";
          spanAlterName.variantNamesString = variantNamesString;
          break;
          // console.log("variantNamesString ist: " + variantNamePart);
        }
        else if ((variantNamesString.length > 50) && (y == variantNames.length-1))
        {
          spanAlterName.innerHTML = variantNamesString;
          break;
          // console.log("variantNamesString ist: " + variantNamePart);
        
        }
        // console.log("variantNamesString ist: " + variantNamePart);
        spanAlterName.innerHTML = variantNamesString;

        
      }

    }
    else{
      spanAlterName.innerHTML = variantNames;
      spanAlterName.variantNamesString = variantNames;
      spanAlterName.variantNames = variantNames;
      // console.log("remove eventlistener");
      // spanAlterName.removeEventListener("click", function () { showAllVariantNames() });
    }
    // spanAlterName.style.display = 'none';
    


    const listCopyButton = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listCopyButton);
    listCopyButton.classList.add('mdc-list-item');
    listCopyButton.classList.add("copyButton");
    listCopyButton.style.width = "2.5%";
    var gndID = jsonGNDsorted.hits.hits[z]._source.jsonGND.gndIdentifier;
    var gndIDUri = "https://d-nb.info/gnd/" + gndID;
    // listCopyButton.id = gndIDUri;
    listCopyButton.style.minWidth = "3%";
    const divContainerCopy = document.createElement("div");
    listCopyButton.insertAdjacentElement("afterbegin", divContainerCopy);
    divContainerCopy.classList.add('mdc-touch-target-wrapper');
    const copyButton = document.createElement("button");
    divContainerCopy.insertAdjacentElement("afterbegin", copyButton);
    copyButton.classList.add('mdc-button');
    copyButton.classList.add('mdc-button--raised');
    copyButton.addEventListener("click", function () { copyToClipboard() });

    const spanCopyLabel = document.createElement("span");
    copyButton.insertAdjacentElement("afterbegin", spanCopyLabel);
    // spanCopyLabel.id = jsonGNDsorted.hits.hits[x]._id;
    spanCopyLabel.classList.add('mdc-button__label');
    spanCopyLabel.innerHTML = "<img src=\"copy-xxl.png\" class=\"copyImage\" id=" + gndIDUri + ">";

    const spanTouchCopy = document.createElement("span");
    copyButton.insertAdjacentElement("afterbegin", spanTouchCopy);
    spanTouchCopy.classList.add('mdc-button__touch');
    spanTouchCopy.id = gndIDUri;

    const divContainerRippleCopy = document.createElement("div");
    copyButton.insertAdjacentElement("afterbegin", divContainerRippleCopy);
    divContainerRippleCopy.classList.add('mdc-button__ripple');




    const listItemGND = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemGND);
    listItemGND.classList.add('mdc-list-item');
    listItemGND.id = "listColumn2";
    const spanGND = document.createElement("span");
    listItemGND.appendChild(spanGND);

    spanGND.innerHTML = gndIDUri;



    const listItemName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemName);
    listItemName.classList.add('mdc-list-item');
    listItemName.id = "listColumn1";
    const spanName = document.createElement("span");
    listItemName.appendChild(spanName);
    spanName.innerHTML = jsonGNDsorted.hits.hits[z]._source.jsonGND.preferredName;
    z = z - 1;
    document.getElementById("rueckMeldung").innerHTML = "Liste ist aktuell.";
  }
}

function createButton(listBeginning, plusOrMinusString, x)
{
  // x = parseInt(x);
  // console.log(x);
  const listPlusButton = document.createElement("li");
  listBeginning.insertAdjacentElement("afterbegin", listPlusButton);
  listPlusButton.classList.add('mdc-list-item');
  listPlusButton.classList.add("plusMinusButton");
  listPlusButton.style.width = "2.5%";
  // console.log("jsonGNDsorted in createButtons: " + jsonGNDsorted.hits.hits.length);
  listPlusButton.id = jsonGNDsorted.hits.hits[x]._id;
  listPlusButton.style.minWidth = "3%";
  if (plusOrMinusString == "minus")
  {
    listPlusButton.style.marginRight = "14%";
    // listPlusButton.style.minWidth = "14%";
  }

  const divContainer = document.createElement("div");
  listPlusButton.insertAdjacentElement("afterbegin", divContainer);
  divContainer.classList.add('mdc-touch-target-wrapper');

  const buttonPlus = document.createElement("button");
  divContainer.insertAdjacentElement("afterbegin", buttonPlus);
  buttonPlus.classList.add('mdc-button');
  buttonPlus.classList.add('mdc-button--raised');
  buttonPlus.addEventListener("click", function () { plusOrMinus(plusOrMinusString) });

  const spanLabel = document.createElement("span");
  buttonPlus.insertAdjacentElement("afterbegin", spanLabel);
  spanLabel.id = jsonGNDsorted.hits.hits[x]._id;
  spanLabel.classList.add('mdc-button__label');
  if (plusOrMinusString == "plus")
  {
    spanLabel.innerHTML = "+";
  }
  else
  {
    spanLabel.innerHTML = "-";
  }

  const spanTouch = document.createElement("span");
  buttonPlus.insertAdjacentElement("afterbegin", spanTouch);
  spanTouch.classList.add('mdc-button__touch');
  spanTouch.id = jsonGNDsorted.hits.hits[x]._id;

  const divContainerRipple = document.createElement("div");
  buttonPlus.insertAdjacentElement("afterbegin", divContainerRipple);
  divContainerRipple.classList.add('mdc-button__ripple');

}