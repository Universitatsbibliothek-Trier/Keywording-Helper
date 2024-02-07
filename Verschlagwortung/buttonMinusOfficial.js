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
async function buttonMinusOfficial(plusOrMinusString)
{
  var buttonIDString = event.target.id;
  let partURL = basicURL + "_doc/" + buttonIDString;
  const response = await fetch(partURL,
    {
      mode: 'cors',
      credentials: "include",
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa( ackels + ':' + blkmgr )  },
     }
  );
  var jsonGNDResponse = await response.json();
  let partURLIncrement = basicURL + "_doc/" + buttonIDString;
  jsonGNDResponse._source.jsonGND.vorkommen = jsonGNDResponse._source.jsonGND.vorkommen + 1;
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
  const responseIncrement = await fetch(partURLIncrement,
    {
      mode: 'cors',
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa( user + ':' + pass )  },
      body:  JSON.stringify( {
        jsonGND
     })
     }
  );
}
