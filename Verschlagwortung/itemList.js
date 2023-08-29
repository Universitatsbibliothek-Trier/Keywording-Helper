'use strict'
let jsonGND;
let jsonGNDsorted;
async function aktualisiereListe()
{
  document.getElementById("listColumn4spec").style.marginLeft = "0.0%";
  document.getElementById("listColumn3spec").style.marginRight = "0%";
  document.getElementById("alternativeSpan").innerHTML = "Alternative Name"
  document.getElementById("rueckMeldung").innerHTML = "aktualisiere Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");
  if (nodeList.hasChildNodes())
  {
    while (nodeList.firstChild) {
      nodeList.removeChild(nodeList.lastChild);
    }
  }
  const listBeginning = document.createElement("ul");
  nodeList.insertAdjacentElement("afterbegin", listBeginning);

  listBeginning.classList.add('list');
  const paginiationUl = document.createElement("ul");
  listBeginning.insertAdjacentElement("afterend", paginiationUl);
  paginiationUl.classList.add('pagination');
  listBeginning.classList.add('my-image-list');


  listBeginning.classList.add('mdc-image-list');
  let partURL = basicURL + "_search?size=10000";
  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
  );
  jsonGND = await response.json();
  jsonGNDsorted = JSON.parse(JSON.stringify(jsonGND));
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

    listItemAlterName.classList.add('mdc-list-item');
    listItemAlterName.id = "listColumn3";
    var spanAlterName = document.createElement("span");
    spanAlterName.id = "span" + jsonGNDsorted.hits.hits[z]._id;
    listItemAlterName.appendChild(spanAlterName);
    var variantNames = jsonGNDsorted.hits.hits[z]._source.jsonGND.variantName;
    spanAlterName.clicked = "false";
    var variantNamesStringSemiColon = "";
    let x = 0;
    if (!(variantNames === undefined))
    {
      for (; x < variantNames.length; x++)
      {
        if (x == 0)
        {
          variantNamesStringSemiColon = variantNamesStringSemiColon + variantNames[x];
        }
        else
        {
          variantNamesStringSemiColon = variantNamesStringSemiColon + "; " + variantNames[x]
        }
      }
    }
    spanAlterName.variantNamesAttr = variantNamesStringSemiColon;
    var expandButton = document.createElement("button");
    var expandButtonSpan = document.createElement("span");
    var variantNamesString = "";
    if (((!(variantNames === undefined))) && ((variantNames.toString()).length > 55))
    {
      let y = 0;
      for (; y < variantNames.length; y++)
      {
        if (y == 0)
        {
          variantNamesString = variantNamesString + variantNames[y];
        }
        else
        {
          variantNamesString = variantNamesString + "; " + variantNames[y];
        }

        if (variantNamesString.length > 50 && (y < variantNames.length))
        {
          spanAlterName.innerHTML = variantNamesString;
          const listItemAlterNameButton = document.createElement("li");
          listItemAlterNameButton.classList.add('mdc-list-item');
          listItemAlterNameButton.id = "expandButtonItem";
          listItemAlterNameButton.insertAdjacentElement("afterbegin", expandButton);
          listBeginning.insertAdjacentElement("afterbegin", listItemAlterNameButton);
          expandButton.classList.add('mdc-fab--mini');
          expandButton.classList.add('mdc-fab');

          expandButton.insertAdjacentElement("afterbegin", expandButtonSpan);
          expandButtonSpan.classList.add('material-icons');
          expandButtonSpan.classList.add('mdc-fab__icon');
          expandButtonSpan.innerHTML = "add";
          expandButton.classList.add("expandButton");
          expandButton.id = "es" + jsonGNDsorted.hits.hits[z]._id;

          spanAlterName.variantNamesString = variantNamesString;
          expandButton.variantNamesString = variantNamesString;
          expandButtonSpan.variantNamesString = variantNamesString;
          expandButtonSpan.addEventListener("click", function () { showAllVariantSpan() });
          spanAlterName.addEventListener("click", function () { showAllVariantNames() });
          break;
        }
        else if ((variantNamesString.length > 50) && (y == variantNames.length - 1))
        {
          spanAlterName.innerHTML = variantNamesString;
          break;
        }
        spanAlterName.innerHTML = variantNamesString;
      }
    }
    else
    {
      const listItemAlterNameButton = document.createElement("li");
      listItemAlterNameButton.classList.add('mdc-list-item');
      listItemAlterNameButton.id = "expandButtonItem";
      listItemAlterNameButton.insertAdjacentElement("afterbegin", expandButton);
      listBeginning.insertAdjacentElement("afterbegin", listItemAlterNameButton);
      expandButton.classList.add('mdc-fab--mini');
      expandButton.classList.add('mdc-fab');

      expandButton.insertAdjacentElement("afterbegin", expandButtonSpan);
      expandButtonSpan.classList.add('material-icons');
      expandButtonSpan.classList.add('mdc-fab__icon');
      expandButton.classList.add("expandButton");
      expandButton.style.visibility = "hidden";

      spanAlterName.innerHTML = variantNamesStringSemiColon;
      spanAlterName.variantNamesString = variantNamesStringSemiColon;
      spanAlterName.variantNames = variantNamesStringSemiColon;
      expandButton.variantNamesString = variantNamesStringSemiColon;
      expandButton.variantNames = variantNamesStringSemiColon;
      expandButtonSpan.variantNamesString = variantNamesStringSemiColon;
      expandButtonSpan.variantNames = variantNamesStringSemiColon;
    }

    expandButton.clicked = "false";
    expandButtonSpan.clicked = "false";
    expandButton.classList.add("expandButton");
    expandButtonSpan.classList.add("buttonSpan");
    expandButtonSpan.id = "spanes" + jsonGNDsorted.hits.hits[z]._id;
    listBeginning.insertAdjacentElement("afterbegin", listItemAlterName);

    const listCopyButton = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listCopyButton);
    listCopyButton.classList.add('mdc-list-item');
    listCopyButton.classList.add("copyButton");
    listCopyButton.style.width = "2.5%";
    var gndID = jsonGNDsorted.hits.hits[z]._source.jsonGND.gndIdentifier;
    var gndIDUri = "https://d-nb.info/gnd/" + gndID;

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
    spanCopyLabel.classList.add('mdc-button__label');
    spanCopyLabel.innerHTML = "<img src=\"images/copy-icon-original.svg\" class=\"copyImage\" id=" + gndIDUri + ">";

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
  paginateItemList();

}

function createButton(listBeginning, plusOrMinusString, x)
{
  const listPlusButton = document.createElement("li");
  listBeginning.insertAdjacentElement("afterbegin", listPlusButton);
  listPlusButton.classList.add('mdc-list-item');
  listPlusButton.classList.add("plusMinusButton");
  listPlusButton.style.width = "2.5%";
  listPlusButton.id = jsonGNDsorted.hits.hits[x]._id;
  listPlusButton.style.minWidth = "3%";
  if (plusOrMinusString == "minus")
  {
    listPlusButton.style.marginRight = "14%";
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
  spanLabel.classList.add('plusAufButton');
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