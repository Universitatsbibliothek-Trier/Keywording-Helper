/* @author       René Ackels
   Copyright (c) 2023 Universität Trier

   This file is part of Keywording-Helper.

   Keywording-Helper is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   Keywording-Helper is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.*/
   
'use strict'

async function suchenListe()
{
  document.getElementById("column2_span").innerHTML = "Kategorie";
  document.getElementById("column3_span").innerHTML = "GND-ID URI ";
  document.getElementById("listColumn4spec").style.marginLeft = "0.0%";
  document.getElementById("listColumn1_5spec").style.width = "20.0%";
  document.getElementById("listColumn2spec").style.width = "10.0%";
  document.getElementById("listColumn3spec").style.width = "19.25%";
  document.getElementById("listColumn3spec").style.marginRight = "0%";
  document.getElementById("alternativeSpan").innerHTML = "Alternative Name"
  document.getElementById("rueckMeldung").innerHTML = "aktualisiere Liste mit GND-Einträgen..."
  let nodeList = document.getElementById("divList");
  let suchEingabe = document.getElementById("searchField").value;
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa( user + ':' + pass )  },
      body: JSON.stringify({
        "query":
        {
          "bool":
          {
            "should":
              [
                {
                  "match_phrase_prefix":
                  // "wildcard":
                  {
                    "jsonGND.preferredName": suchEingabe + "*"
                  }
                },
                {
                  "match_phrase_prefix":
                  // "wildcard":
                  {
                    "jsonGND.variantName": suchEingabe + "*"
                  }
                }
              ]
          }
        }
      })
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
          expandButton.id="es" + jsonGNDsorted.hits.hits[z]._id;

          spanAlterName.variantNamesString = variantNamesString;
          expandButton.variantNamesString = variantNamesString;
          expandButtonSpan.variantNamesString = variantNamesString;
          spanAlterName.addEventListener("click", function () { showAllVariantNames() });
          expandButtonSpan.addEventListener("click", function () { showAllVariantSpan() });
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

    const listItemKategorie = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemKategorie);
    listItemKategorie.classList.add('mdc-list-item');
    listItemKategorie.id = "listColumn1_5";
    const spanKategorie = document.createElement("span");
    listItemKategorie.appendChild(spanKategorie);
    let gndType = (jsonGNDsorted.hits.hits[z]._source.jsonGND.type).toString();
    gndType = gndType.replace(",AuthorityResource","");
    gndType = gndType.replace("AuthorityResource,","");
    // gndType = gndType.replace(",",", ");
    let categoryString = gndType;
    if(!(jsonGNDsorted.hits.hits[z]._source.jsonGND.biographicalOrHistoricalInformation === undefined))
      {
        categoryString = categoryString + "<br>" + jsonGNDsorted.hits.hits[z]._source.jsonGND.biographicalOrHistoricalInformation;
      }
    if(!(jsonGNDsorted.hits.hits[z]._source.jsonGND.broaderTermInstantial === undefined))
      {
        categoryString = categoryString + "<br>" + jsonGNDsorted.hits.hits[z]._source.jsonGND.broaderTermInstantial[0].label;
      }
    if(!(jsonGNDsorted.hits.hits[z]._source.jsonGND.broaderTermGeneric === undefined))
      {
        categoryString = categoryString +  "<br>" + jsonGNDsorted.hits.hits[z]._source.jsonGND.broaderTermGeneric[0].label;
      }
      if(!(jsonGNDsorted.hits.hits[z]._source.jsonGND.professionOrOccupation === undefined) && !(jsonGNDsorted.hits.hits[z]._source.jsonGND.professionOrOccupation[0] === undefined))
        {
          categoryString = categoryString +  "<br>" + jsonGNDsorted.hits.hits[z]._source.jsonGND.professionOrOccupation[0].label;
        }
    categoryString = categoryString.replaceAll(",",", ");
    spanKategorie.innerHTML = categoryString;

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