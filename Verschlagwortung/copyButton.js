'use strict'


async function copyToClipboard()
{
  navigator.clipboard.writeText(event.target.id);
  document.getElementById("rueckMeldung").innerHTML = "GND-URI kopiert.";
}