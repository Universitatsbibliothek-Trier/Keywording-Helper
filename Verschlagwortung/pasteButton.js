'use strict'

async function pasteFromClipboard()
{
  document.getElementById("gndNumber").focus();
  document.getElementById("rueckMeldung").innerHTML = "GND-URI eingefügt.";
  navigator.clipboard
    .readText()
    .then((clipText) =>
    {
      document.getElementById("gndNumber").value = clipText;
    }
    );
}