'use strict'

async function createOfficialGNDList(jsonGND)
{
  alternativeSpan
  document.getElementById("alternativeSpan").innerHTML = "Kategorie"
  document.getElementById("listColumn3spec").style.marginRight = "-3.2%";
  document.getElementById("rueckMeldung").innerHTML = "Erstelle offizielle Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");

  if (nodeList.hasChildNodes())
  {
    nodeList.removeChild(nodeList.children[0]);
  }

  const listBeginning = document.createElement("ul");
  listBeginning.id = "unorderedList";
  nodeList.insertAdjacentElement("afterbegin", listBeginning);
  listBeginning.classList.add('mdc-image-list');

  let z = parseInt(jsonGND.length) - 1;
  for (let x in jsonGND)
  {
    let jsonGNDString = jsonGND[z].id;
    let jsonGNDIdPart = jsonGNDString.substring(22, jsonGNDString.length);
    let partGetURL = basicURL + "_search";
    // console.log("jsonGNDid ist: " + jsonGND[z].id);
    // console.log("jsonGNDidPart ist: " + jsonGNDIdPart);
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
    // console.log("jsonGND hits array from official GND: " + jsonGNDLocal.hits.hits);

    // todo: search eigene DB with preferred name from official gnd answer jsonGND.label; 
    // wenn leere antwort von eigner db zurückkommt => vorkommen = 0 und bei "+"-Button:
    // httprequest an offizielle GND und entsprechende eintragung in die eigene DB mit vorkommen = 1 (selbe Methode wie seachGND? von getGNDButton)
    // wenn nicht leere anwort => zeige richtiges vorkommen an und erhöhe bei "+"-Button vorkommen um 1 => (selbe Methode wie von buttonPlus Methode GND-ID mitgeben als Parameter)
    if ((jsonGNDLocal.hits.hits).length > 0)
    {
      createButtonOfficial(listBeginning, "minus", jsonGNDIdPart);
    }
    createButtonOfficial(listBeginning, "plus", jsonGNDIdPart);


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
    spanAlterName.id = "span" + jsonGNDIdPart;
    listItemAlterName.appendChild(spanAlterName);
    var variantNames = jsonGND[z].category;
    spanAlterName.innerHTML = variantNames;


    listBeginning.insertAdjacentElement("afterbegin", listItemAlterName);

    const listCopyButton = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listCopyButton);
    listCopyButton.classList.add('mdc-list-item');
    listCopyButton.classList.add("copyButton");
    listCopyButton.style.width = "2.5%";
    // let gndID = jsonGND.hits.hits[z]._source.jsonGND.gndIdentifier;
    let gndIDUri = jsonGNDIdPart;
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
    // spanCopyLabel.id = jsonGND.hits.hits[x]._id;
    spanCopyLabel.classList.add('mdc-button__label');
    spanCopyLabel.innerHTML = "<img src=\"copy-xxl.png\" class=\"copyImage\" id=" + jsonGND[z].id + ">";

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
      for (let x in jsonGNDLocal.hits.hits)
      {
        console.log("Eintragung in DB existiert");
        console.log("Eintrag ist: " + jsonGNDLocal.hits.hits[x]);
        spanVorkommen.innerHTML = jsonGNDLocal.hits.hits[x]._source.jsonGND.vorkommen;
      }

    }
    else{
      spanVorkommen.innerHTML = 0;
    }

    document.getElementById("rueckMeldung").innerHTML = "Ergebnisse der Suche:";
  }
}

function createButtonOfficial(listBeginning, plusOrMinusString, jsonGNDIdPart)
{
  // x = parseInt(x);
  // console.log("jsonGND ist: " + jsonGND[z]);
  const listPlusButton = document.createElement("li");
  listBeginning.insertAdjacentElement("afterbegin", listPlusButton);
  listPlusButton.classList.add('mdc-list-item');

  listPlusButton.style.width = "2.5%";
  // console.log("jsonGND in createButtons: " + jsonGND.hits.hits.length);
  listPlusButton.id = jsonGNDIdPart;
  listPlusButton.style.minWidth = "3%";

  const divContainer = document.createElement("div");
  listPlusButton.insertAdjacentElement("afterbegin", divContainer);
  divContainer.classList.add('mdc-touch-target-wrapper');

  const buttonPlus = document.createElement("button");
  divContainer.insertAdjacentElement("afterbegin", buttonPlus);
  buttonPlus.classList.add('mdc-button');
  buttonPlus.classList.add('mdc-button--raised');
  buttonPlus.addEventListener("click", function () { plusOrMinusOfficial(plusOrMinusString) });

  const spanLabel = document.createElement("span");
  buttonPlus.insertAdjacentElement("afterbegin", spanLabel);
  spanLabel.id = jsonGNDIdPart;
  spanLabel.classList.add('mdc-button__label');
  if (plusOrMinusString == "plus")
  {
    // CSS if-abfrage, ob button alleine steht
    listPlusButton.classList.add("plusButtonAlone");
    spanLabel.innerHTML = "+";
  }
  else
  {
    // listPlusButton.classList.add("plusButton");
    spanLabel.innerHTML = "-";
  }

  const spanTouch = document.createElement("span");
  buttonPlus.insertAdjacentElement("afterbegin", spanTouch);
  spanTouch.classList.add('mdc-button__touch');
  spanTouch.id = jsonGNDIdPart;

  const divContainerRipple = document.createElement("div");
  buttonPlus.insertAdjacentElement("afterbegin", divContainerRipple);
  divContainerRipple.classList.add('mdc-button__ripple');

}