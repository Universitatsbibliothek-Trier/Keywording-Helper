'use strict'

document.createElement("ul");

async function aktualisiereListe()
{
  let nodeList = document.getElementById("divList");

  if (nodeList.hasChildNodes())
  {
    nodeList.removeChild(nodeList.children[0]);
  }
  //code to 

  const listBeginning = document.createElement("ul");
  nodeList.insertAdjacentElement("afterbegin", listBeginning);
  listBeginning.classList.add('mdc-list');

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
    

    const listItem = document.createElement("li");
    listBeginning.insertAdjacentElement("afterbegin", listItem);
    listItem.classList.add('mdc-list-item');
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    span1.classList.add('mdc-list-item__ripple');
    span2.classList.add('mdc-list-item__text');
    listItem.appendChild(span1);
    listItem.appendChild(span2);
    span2.id = "listElement1";
    span2.innerHTML = "GND-ID:  " + jsonGND.hits.hits[x]._source.jsonGND.gndIdentifier + "   " + jsonGND.hits.hits[x]._source.jsonGND.preferredName + "   Vorkommen: 1";
  }
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