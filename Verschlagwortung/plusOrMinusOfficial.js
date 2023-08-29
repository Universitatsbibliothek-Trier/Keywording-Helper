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

async function plusOrMinusOfficial(plusOrMinusString)
{
  let buttonID  = event.target;
  if(plusOrMinusString == "plus")
  {
    document.getElementById("rueckMeldung").innerHTML = "Erhöhe Anzahl um 1."
    await buttonPlusRaiseOfficial(buttonID);
  }
  else{
    document.getElementById("rueckMeldung").innerHTML = "Verringere Anzahl um 1."
    await buttonMinusOfficial(buttonID);
  }
  setTimeout(aktualisiereListe, 1000);
}