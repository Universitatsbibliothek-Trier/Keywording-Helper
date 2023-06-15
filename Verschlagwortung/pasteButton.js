'use strict'

// navigator.permissions.query({name: "clipboard-write"}).then((result) => {
//   if (result.state === "granted" || result.state === "prompt") {
//     /* write to the clipboard now */
//   }
// });


async function pasteFromClipboard()
{
  // document.execCommand('paste');
  document.getElementById("rueckMeldung").innerHTML = "GND-URI eingefügt.";
  document.getElementById("rueckMeldung").innerHTML = await navigator.clipboard.readText();
  
}