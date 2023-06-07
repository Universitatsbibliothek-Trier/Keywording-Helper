'use strict'

// var unorderedList = document.getElementById("unorderedList");
// unorderedList.remove();
// document.createElement("ul");
var jsonGND;
var jsonGNDsorted;
async function suchenListe()
{
  // var unorderedList = document.getElementById("unorderedList");
  // unorderedList.remove();
  document.getElementById("rueckMeldung").innerHTML = "aktualisiere Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");
  let suchEingabe = document.getElementById("searchField").value;

  console.log("Eingabe ist: " + suchEingabe);

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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "query":
        {

          "bool":
          {
            "should":
              [
                {
                  "wildcard":
                  {
                    "jsonGND.preferredName": suchEingabe + "*"

                  }
                },
                {
                  "wildcard":
                  {
                    "jsonGND.variantName": suchEingabe + "*"
                  }

                }
              ]

          }
        }
        //   "query" : { 
        //     "match" : {
        //       "jsonGND.preferredName" : 
        //       suchEingabe

        //     }

        // }
      })
    }
  );

  jsonGND = await response.json();
  // console.log("response ist: " + jsonGND);
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
    const spanAlterName = document.createElement("span");
    listItemAlterName.appendChild(spanAlterName);
    spanAlterName.innerHTML = jsonGNDsorted.hits.hits[z]._source.jsonGND.variantName;
    // spanAlterName.visibility = 'hidden';
    // to do ausklappbar nach 1 Zeile oder ca 30 Buchstaben
    spanAlterName.style.display = 'none';

    const listItemGND = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemGND);
    listItemGND.classList.add('mdc-list-item');
    listItemGND.id = "listColumn2";
    const spanGND = document.createElement("span");
    listItemGND.appendChild(spanGND);
    spanGND.innerHTML = jsonGNDsorted.hits.hits[z]._source.jsonGND.gndIdentifier;

    const listItemName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemName);
    listItemName.classList.add('mdc-list-item');
    listItemName.id = "listColumn1";
    const spanName = document.createElement("span");
    listItemName.appendChild(spanName);
    spanName.innerHTML = jsonGNDsorted.hits.hits[z]._source.jsonGND.preferredName;
    z = z - 1;
    document.getElementById("rueckMeldung").innerHTML = "Liste ist aktualisiert.";
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
  listPlusButton.style.width = "2.3%";
  // console.log("jsonGNDsorted in createButtons: " + jsonGNDsorted.hits.hits.length);
  listPlusButton.id = jsonGNDsorted.hits.hits[x]._id;
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