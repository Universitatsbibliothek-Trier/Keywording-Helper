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

async function showAllVariantSpan()
{
  var esID = event.target.id;
  var spanID = esID.substring(4,esID.length);
  var ButtonElement = document.getElementById(spanID);
  var spanElementID = esID.replace("spanes","span");
  var spanElement = document.getElementById(spanElementID);
  if(event.target.clicked == "false")
  {
    event.target.innerHTML = "remove";
    spanElement.innerHTML = spanElement.variantNamesAttr;
    event.target.clicked = "true";
    spanElement.clicked = "true";
    ButtonElement.clicked = "true";
  }
  else{
    event.target.clicked = "false";
    spanElement.clicked = "false";
    ButtonElement.clicked = "false";
    event.target.innerHTML = "add";
    if(spanElement.variantNamesString.length < 50)
    {
      spanElement.innerHTML = spanElement.variantNamesString;
    }
    else{
      spanElement.innerHTML = spanElement.variantNamesString;
    }
  }
}