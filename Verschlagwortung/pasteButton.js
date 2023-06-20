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
  // document.getElementById("rueckMeldung").innerHTML = await navigator.clipboard.readText();
  // gndNumber.focus();
  // document.execCommand("Paste", null, null);
  // navigator.clipboard
  //       .readText()
  //       .then((clipText) => {
  //             document.getElementById("gndNumber").innerHTML = clipText;
  //           }
  //         );
  // document.getElementById("gndURI").innerHTML = "so ein schwachsinn";
   navigator.clipboard
          .readText()
          .then((clipText) => {
            document.getElementById("gndNumber").value = clipText;
            // document.getElementById("rueckMeldung").innerHTML = clipText;
            console.log("Text ist: " + clipText);
              }
            );
}