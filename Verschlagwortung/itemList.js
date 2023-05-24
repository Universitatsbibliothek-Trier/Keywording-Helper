'use strict'

var list = '<ul class="mdc-list"> \
<li class="mdc-list-item" tabindex="0">\
  <span class="mdc-list-item__ripple"></span>\
  <span class="mdc-list-item__text">Item 1 - Division 1</span>\
</li>\
<li class="mdc-list-item">\
  <span class="mdc-list-item__ripple"></span>\
  <span class="mdc-list-item__text">Item 2 - Division 1</span>\
</li>\
<li role="separator" class="mdc-list-divider"></li>\
<li class="mdc-list-item">\
  <span class="mdc-list-item__ripple"></span>\
  <span class="mdc-list-item__text">Item 1 - Division 2</span>\
</li>\
<li class="mdc-list-item">\
  <span class="mdc-list-item__ripple"></span>\
  <span class="mdc-list-item__text">Item 2 - Division 2</span>\
</li>\
';

//code to 
let partURL = "https://0.0.0.0:9200/gnd/_doc/";
  var jsonGND = await responseGND.json();
  console.log(jsonGND.gndIdentifier);

  var gndIdentifier = jsonGND.gndIdentifier;

  const response = await fetch(partURL, 
     {
      mode: 'cors',
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify( {
        jsonGND
        // "gndid" : gndIdentifier
      // "anzahl":  0
     })
     }
  ); 
  
list = list + "</ul>";
document.write(list);