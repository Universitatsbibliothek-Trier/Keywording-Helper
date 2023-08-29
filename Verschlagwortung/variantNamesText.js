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

async function showAllVariantNames()
{
  var idString = event.target.id;
  idString = idString.substring(4, idString.length);
  var buttonIDString = "es" + idString;
  var buttonSpanIDString = "spanes" + idString;
  var buttonElement = document.getElementById(buttonIDString);
  var spanButtonElement = document.getElementById(buttonSpanIDString);
  if(event.target.clicked == "false")
  {
    event.target.innerHTML = event.target.variantNamesAttr;
    event.target.clicked = "true";
    buttonElement.clicked = "true";
    spanButtonElement.clicked = "true";
    spanButtonElement.innerHTML = "remove";
  }
  else{
    event.target.clicked = "false";
    buttonElement.clicked = "false";
    spanButtonElement.clicked = "false";
    spanButtonElement.innerHTML = "add";
    if(event.target.variantNamesString.length < 50)
    {
      event.target.innerHTML = event.target.variantNamesString;
    }
    else{
      event.target.innerHTML = event.target.variantNamesString;
    }
  }
}