/* @author       René Ackels
   Copyright (c) 2023 Universität Trier

   This file is part of OCR-To-TEI.

   OCR-To-TEI is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   OCR-To-TEI is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.*/
   
'use strict'
async function buttonMinusRaise(buttonID)
{
  var buttonIDString = buttonID.id;
  let partURL = basicURL + "_doc/" + buttonIDString;
  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     }
  );
  var jsonGNDResponse = await response.json();
  jsonGNDResponse._source.jsonGND.vorkommen = jsonGNDResponse._source.jsonGND.vorkommen - 1
  if(jsonGNDResponse._source.jsonGND.vorkommen > 0)
  {
    delete jsonGNDResponse._version;
    delete jsonGNDResponse._seq_no;
    delete jsonGNDResponse._primary_term;
    delete jsonGNDResponse.found;
    var jsonGND = Object.assign({}, jsonGNDResponse);
    delete jsonGND._source;
    for(let property in jsonGNDResponse._source.jsonGND)
    {
      jsonGND[property] = jsonGNDResponse._source.jsonGND[property];
    }
    const responseIncrement = await fetch(partURL,
      {
        mode: 'cors',
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:  JSON.stringify( {
          jsonGND
       })
       }
    );
  }
  else
  {
    const responseDelete = await fetch(partURL,
      {
        mode: 'cors',
        credentials: "include",
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' } 
       }
    );
  }
}
