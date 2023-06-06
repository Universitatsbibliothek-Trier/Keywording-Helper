'use strict'

document.createElement("ul");
var jsonGND;
async function aktualisiereListe()
{
  document.getElementById("rueckMeldung").innerHTML = "aktualisiere Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");

  if (nodeList.hasChildNodes())
  {
    nodeList.removeChild(nodeList.children[0]);
  }

  const listBeginning = document.createElement("ul");
  nodeList.insertAdjacentElement("afterbegin", listBeginning);
  listBeginning.classList.add('mdc-image-list');

  let partURL = basicURL + "_search?size=10000";

  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  jsonGND = await response.json();

  // console.log(jsonGND.hits.hits._source.jsonGND.vorkommen);
  // todo
  function compare( a, b ) {
    if ( jsonGND.hits.hits[a]._source.jsonGND.vorkommen < jsonGND.hits.hits[b+1]._source.jsonGND.vorkommen ){
      return -1;
    }
    if ( jsonGND.hits.hits[a]._source.jsonGND.vorkommen> jsonGND.hits.hits[b+1]._source.jsonGND.vorkommen ){
      return 1;
    }
    return 0;
  }
let a = 1;
let b = 2;
  jsonGND.sort( compare(a,b));
  // for (let x in jsonGND.hits.hits)
  // {
  //   function compare( a, b ) {
  //     if ( jsonGND.hits.hits[x]._source.jsonGND.vorkommen < jsonGND.hits.hits[x+1]._source.jsonGND.vorkommen ){
  //       return -1;
  //     }
  //     if ( jsonGND.hits.hits[x]._source.jsonGND.vorkommen> jsonGND.hits.hits[x+1]._source.jsonGND.vorkommen ){
  //       return 1;
  //     }
  //     return 0;
  //   }

    // jsonGND.sort( compare);
  // }
  console.log("sortiertes Array ist: ");
  console.log(jsonGND);

  var test = "";
  for (let x in jsonGND.hits.hits)
  {
    // sortierfunktion nach Anzahl einbauen
    createButton(listBeginning, "minus", x);
    createButton(listBeginning, "plus", x);

    const listVorkommen = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listVorkommen);
    listVorkommen.classList.add('mdc-list-item');
    listVorkommen.id = "listColumn4";
    const spanVorkommen = document.createElement("span");
    listVorkommen.appendChild(spanVorkommen);
    spanVorkommen.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.vorkommen;

    const listItemAlterName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemAlterName);
    listItemAlterName.classList.add('mdc-list-item');
    listItemAlterName.id = "listColumn3";
    const spanAlterName = document.createElement("span");
    listItemAlterName.appendChild(spanAlterName);
    spanAlterName.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.variantName;
    // spanAlterName.visibility = 'hidden';
    // to do ausklappbar nach 1 Zeile oder ca 30 Buchstaben
    spanAlterName.style.display = 'none';

    const listItemGND = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemGND);
    listItemGND.classList.add('mdc-list-item');
    listItemGND.id = "listColumn2";
    const spanGND = document.createElement("span");
    listItemGND.appendChild(spanGND);
    spanGND.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.gndIdentifier;

    const listItemName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemName);
    listItemName.classList.add('mdc-list-item');
    listItemName.id = "listColumn1";
    const spanName = document.createElement("span");
    listItemName.appendChild(spanName);
    spanName.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.preferredName;

    document.getElementById("rueckMeldung").innerHTML = "Liste ist aktualisiert.";
  }
}

function createButton(listBeginning, plusOrMinusString, x)
{
  const listPlusButton = document.createElement("li");
  listBeginning.insertAdjacentElement("afterbegin", listPlusButton);
  listPlusButton.classList.add('mdc-list-item');
  listPlusButton.classList.add("plusMinusButton");
  listPlusButton.style.width = "2.3%";
  listPlusButton.id = jsonGND.hits.hits[x]._id;
  if (plusOrMinusString == "minus")
  {
    listPlusButton.style.marginRight = "25%";
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
  spanLabel.id = jsonGND.hits.hits[x]._id;
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
  spanTouch.id = jsonGND.hits.hits[x]._id;

  const divContainerRipple = document.createElement("div");
  buttonPlus.insertAdjacentElement("afterbegin", divContainerRipple);
  divContainerRipple.classList.add('mdc-button__ripple');

}