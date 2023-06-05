'use strict'

document.createElement("ul");

async function aktualisiereListe()
{
  document.getElementById("rueckMeldung").innerHTML = "aktualisiere Liste mit GND-Einträgen..."
  // var ImageList = document.querySelector('.mdc-image-list');

  // ImageList.cols = 1;
  // imageList.



  let nodeList = document.getElementById("divList");

  if (nodeList.hasChildNodes())
  {
    nodeList.removeChild(nodeList.children[0]);
  }
  //code to 

  const listBeginning = document.createElement("ul");
  nodeList.insertAdjacentElement("afterbegin", listBeginning);
  // listBeginning.classList.add('mdc-list');
  listBeginning.classList.add('mdc-image-list');

  let partURL = "https://0.0.0.0:9200/gnd/_search?size=10000";

  // const responseGND = await fetch(partURL);


  // var gndIdentifier = jsonGND.gndIdentifier;
  // let username = 'ackels';
  // let password = 'blkmgr';
  // let headers = new Headers();
  // headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
  // headers.append('Content-Type', 'application/json');
  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      // auth: { username: 'ackels', password: 'blkmgr' },
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({

      //   "query": {
      //     "match_all": {}
      //   }

      // })
    }
  );

  var jsonGND = await response.json();
  // console.log(jsonGND);
  console.log(jsonGND.hits.hits);

  var test = "";
  for (let x in jsonGND.hits.hits)
  {
    // sortierfunktion nach Anzahl einbauen

    // const listItemSep = document.createElement("li");
    // listItemSep.classList.add('mdc-list-item');
    // listItemSep.role = "separator";
    // // listItem.insertAdjacentElement("afterbegin", listItem2);
    // listBeginning.insertAdjacentElement("afterbegin", listItemSep);
    createButton(listBeginning, "minus");
    createButton(listBeginning, "plus");



    //     <div class="mdc-touch-target-wrapper">
    //        <button onclick="aktualisiereListe()" class="mdc-button mdc-button--raised" id="aktualisierungsButton">
    //          <div class="mdc-button__ripple"></div>
    //          <span class="mdc-button__touch"></span>
    //          <span class="mdc-button__label">Aktualisieren</span>
    //        </button> 
    //     </div>



    const listVorkommen = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listVorkommen);
    listVorkommen.classList.add('mdc-list-item');
    listVorkommen.id = "listColumn4";
    const spanVorkommen = document.createElement("span");
    listVorkommen.appendChild(spanVorkommen);
    // spanName.id = "listElement1";
    spanVorkommen.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.vorkommen;


    const listItemAlterName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemAlterName);
    listItemAlterName.classList.add('mdc-list-item');
    listItemAlterName.id = "listColumn3";
    const spanAlterName = document.createElement("span");
    listItemAlterName.appendChild(spanAlterName);
    // spanName.id = "listElement1";
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
    // spanGND.id = "listElement1";
    spanGND.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.gndIdentifier;


    // const listItemSep = document.createElement("hr");
    // listItemSep.id="column1sep";
    // listBeginning.insertAdjacentElement("afterbegin", listItemSep);


    const listItemName = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItemName);
    listItemName.classList.add('mdc-list-item');
    listItemName.id = "listColumn1";
    const spanName = document.createElement("span");
    listItemName.appendChild(spanName);
    // spanName.id = "listElement1";
    spanName.innerHTML = jsonGND.hits.hits[x]._source.jsonGND.preferredName;

    document.getElementById("rueckMeldung").innerHTML = "Liste ist aktualisiert.";
    // listItemSep.classList.add('mdc-list-item');
    // listItemSep.role = "separator";



  }

  // const listItem2 = document.createElement("li");
  //   listItem2.classList.add('mdc-list-divider');
  //   listItem2.role = "separator";
  //   // listItem.insertAdjacentElement("afterbegin", listItem2);
  //   listBeginning.insertAdjacentElement("afterbegin", listItem2);

  //   const listItem = document.createElement("li");
  //   listBeginning.insertAdjacentElement("afterbegin", listItem);
  //   listItem.classList.add('mdc-list-item');
  //   const span1 = document.createElement("span");
  //   const span2 = document.createElement("span");
  //   span1.classList.add('mdc-list-item__ripple');
  //   span2.classList.add('mdc-list-item__text');
  //   listItem.appendChild(span1);
  //   listItem.appendChild(span2);
  //   span2.id = "listElement1";
  //   span2.innerHTML = "GND-ID:  " + jsonGND.hits.hits[x]._source.jsonGND.gndIdentifier + "   " 
  //   + jsonGND.hits.hits[x]._source.jsonGND.preferredName + "   Vorkommen: 1 alternative/r Name/n: " + jsonGND.hits.hits[x]._source.jsonGND.variantName;


  //todo
  //   var list = '<ul class="mdc-list"> \
  // <li class="mdc-list-item" tabindex="0">\
  //   <span class="mdc-list-item__ripple"></span>\
  //   <span class="mdc-list-item__text">Item 1 - Division 1</span>\
  // </li>\
  // <li class="mdc-list-item">\
  //   <span class="mdc-list-item__ripple"></span>\
  //   <span class="mdc-list-item__text">Item 2 - Division 1</span>\
  // </li>\
  // <li role="separator" class="mdc-list-divider"></li>\
  // <li class="mdc-list-item">\
  //   <span class="mdc-list-item__ripple"></span>\
  //   <span class="mdc-list-item__text">Item 1 - Division 2</span>\
  // </li>\
  // <li class="mdc-list-item">\
  //   <span class="mdc-list-item__ripple"></span>\
  //   <span class="mdc-list-item__text">Item 2 - Division 2</span>\
  // </li>\
  // ';

}

function createButton(listBeginning, plusOrMinusString)
{
  const listPlusButton = document.createElement("li");
  listBeginning.insertAdjacentElement("afterbegin", listPlusButton);
  listPlusButton.classList.add('mdc-list-item');
  listPlusButton.style.width = "2.3%";
  listPlusButton.id = "plusMinusButton";
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

  const divContainerRipple = document.createElement("div");
  buttonPlus.insertAdjacentElement("afterbegin", divContainerRipple);
  divContainerRipple.classList.add('mdc-button__ripple');

}