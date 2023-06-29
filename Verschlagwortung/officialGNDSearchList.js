'use strict'

async function createOfficialGNDList(jsonGND)
{
  document.getElementById("alternativeSpan").innerHTML = "Kategorie"
  document.getElementById("listColumn3spec").style.marginRight = "-3.2%";
  document.getElementById("rueckMeldung").innerHTML = "Erstelle offizielle Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");
  if (nodeList.hasChildNodes())
  {
    while (nodeList.firstChild) {
      nodeList.removeChild(nodeList.lastChild);
    }
  }
  const listBeginning = document.createElement("ul");
  listBeginning.id = "unorderedList";
  nodeList.insertAdjacentElement("afterbegin", listBeginning);
  listBeginning.classList.add('list');
  listBeginning.classList.add('my-image-list');
  listBeginning.classList.add('mdc-image-list');
  let z = parseInt(jsonGND.length) - 1;
  if (jsonGND.length == 0)
  {
    document.getElementById("rueckMeldung").innerHTML = "Keine GND-Einträge gefunden."
  }
  for (let x in jsonGND)
  {
    let jsonGNDString = jsonGND[z].id;
    let jsonGNDIdPart = jsonGNDString.substring(22, jsonGNDString.length);
    let partGetURL = basicURL + "_search";
    const responseGet = await fetch(partGetURL,
      {
        mode: 'cors',
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "query": {
            "bool": {
              "filter": {
                "term": {
                  "jsonGND.gndIdentifier.keyword": jsonGNDIdPart
                }
              }
            }
          }
        })
      }
    );
    let jsonGNDLocal = await responseGet.json();
    let localGNDExists = true;
    if ((jsonGNDLocal.hits.hits).length > 0)
    {
      jsonGNDIdPart = jsonGNDLocal.hits.hits[0]._id;
      createButtonOfficial(listBeginning, "minus", jsonGNDIdPart, localGNDExists);
      createButtonOfficial(listBeginning, "plus", jsonGNDIdPart, localGNDExists);
    }
    else
    {
      localGNDExists = false;
      createButtonOfficial(listBeginning, "plus", jsonGNDIdPart);
    }
    const listVorkommen = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listVorkommen);
    listVorkommen.classList.add('mdc-list-item');
    listVorkommen.id = "listColumn4";
    const spanVorkommen = document.createElement("span");
    listVorkommen.appendChild(spanVorkommen);
    const listItemAlterName = document.createElement("li");

    listItemAlterName.classList.add('mdc-list-item');
    listItemAlterName.id = "listColumn3";
    var spanAlterName = document.createElement("span");
    listItemAlterName.appendChild(spanAlterName);
    var variantNames = jsonGND[z].category;
    spanAlterName.innerHTML = variantNames;
    listBeginning.insertAdjacentElement("afterbegin", listItemAlterName);

    const listCopyButton = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listCopyButton);
    listCopyButton.classList.add('mdc-list-item');
    listCopyButton.classList.add("copyButton");
    listCopyButton.style.width = "2.5%";
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
    spanCopyLabel.innerHTML = "<img src=\"images/copy-xxl.png\" class=\"copyImage\" id=" + jsonGND[z].id + ">";

    const spanTouchCopy = document.createElement("span");
    copyButton.insertAdjacentElement("afterbegin", spanTouchCopy);
    spanTouchCopy.classList.add('mdc-button__touch');
    spanTouchCopy.id = jsonGND[z].id;

    const divContainerRippleCopy = document.createElement("div");
    copyButton.insertAdjacentElement("afterbegin", divContainerRippleCopy);
    divContainerRippleCopy.classList.add('mdc-button__ripple');

    const listItemGND = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemGND);
    listItemGND.classList.add('mdc-list-item');
    listItemGND.id = "listColumn2";
    const spanGND = document.createElement("span");
    listItemGND.appendChild(spanGND);
    spanGND.innerHTML = jsonGND[z].id;

    const listItemName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemName);
    listItemName.classList.add('mdc-list-item');
    listItemName.id = "listColumn1";
    const spanName = document.createElement("span");
    listItemName.appendChild(spanName);
    spanName.innerHTML = jsonGND[z].label;
    z = z - 1;
    if ((jsonGNDLocal.hits.hits).length > 0)
    {
      spanVorkommen.innerHTML = jsonGNDLocal.hits.hits[0]._source.jsonGND.vorkommen;
    }
    else
    {
      spanVorkommen.innerHTML = 0;
    }
    document.getElementById("rueckMeldung").innerHTML = "Ergebnisse der Suche:";
  }
}

function createButtonOfficial(listBeginning, plusOrMinusString, jsonGNDIdPart, localGNDExists)
{
  const listPlusButton = document.createElement("li");
  listBeginning.insertAdjacentElement("afterbegin", listPlusButton);
  listPlusButton.classList.add('mdc-list-item');
  listPlusButton.style.width = "2.5%";

  const divContainer = document.createElement("div");
  listPlusButton.insertAdjacentElement("afterbegin", divContainer);
  divContainer.classList.add('mdc-touch-target-wrapper');

  const buttonPlus = document.createElement("button");
  divContainer.insertAdjacentElement("afterbegin", buttonPlus);
  buttonPlus.classList.add('mdc-button');
  buttonPlus.classList.add('mdc-button--raised');

  const spanLabel = document.createElement("span");
  buttonPlus.insertAdjacentElement("afterbegin", spanLabel);
  spanLabel.classList.add('mdc-button__label');

  const spanTouch = document.createElement("span");
  buttonPlus.insertAdjacentElement("afterbegin", spanTouch);
  spanTouch.classList.add('mdc-button__touch');

  const divContainerRipple = document.createElement("div");
  buttonPlus.insertAdjacentElement("afterbegin", divContainerRipple);
  divContainerRipple.classList.add('mdc-button__ripple');
  listPlusButton.classList.add("plusMinusButton");

  listPlusButton.id = jsonGNDIdPart;
  spanLabel.id = jsonGNDIdPart;
  spanTouch.id = jsonGNDIdPart;
  if (localGNDExists)
  {
    if (plusOrMinusString == "plus")
    {
      listPlusButton.style.width = "2.5%";
      spanLabel.innerHTML = "+";
      buttonPlus.addEventListener("click", function () { plusOrMinus(plusOrMinusString) });
    }
    else
    {
      buttonPlus.addEventListener("click", function () { plusOrMinus(plusOrMinusString) });
      listPlusButton.classList.add("minusButton");
      spanLabel.innerHTML = "-";
    }
  }
  else
  {
    listPlusButton.classList.add("plusButtonAlone");
    buttonPlus.addEventListener("click", function () { getNewGNDOfficial() });
    spanLabel.innerHTML = "+";
  }
}