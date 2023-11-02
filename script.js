document.addEventListener("DOMContentLoaded", function () {
  const attackContainer = document.getElementById("attacklist");
  const addAttackBtn = document.getElementById("addAttack")
  const removeAttackBtn = document.getElementById("removeAttack")
  const calcBtn = document.getElementById("doCalc")
  var critchCheckbox = document.getElementById("critch");
  var critdCheckbox = document.getElementById("critd");
  var powFieldBox = document.getElementById("powfield");
  var advSelect = document.getElementById("advStateList");
  var attackID = 0;
  var idList = []
  addAttack();

  //================================================
  critchCheckbox.addEventListener("change", function() {
    for (var i of idList){
      const critchinput = document.getElementById("critchance" + i);
      const critchlabel = document.getElementById("critchlabel" + i);

      if (critchCheckbox.checked) { 
          critchinput.style.display = "inline";
          critchlabel.style.display = "inline";
      } else {
        critchinput.style.display = "none";
        critchlabel.style.display = "none";
      }
    }
  });
  critdCheckbox.addEventListener("change", function() {
    for (var i of idList){
      critdmginput = document.getElementById("critdamage" + i);
      critdmglabel = document.getElementById("critdmglabel" + i);

      if (critdCheckbox.checked) {
        critdmginput.style.display = "inline";
        critdmglabel.style.display = "inline";
      } else {
        critdmginput.style.display = "none";
        critdmglabel.style.display = "none";
      }
    }
  });
  powFieldBox.addEventListener("change", function() {

    for (var i of idList){
      powfieldinput = document.getElementById("powatt" + i);
      powfieldlabel = document.getElementById("powattlabel" + i);

      if (powFieldBox.checked) {
        powfieldinput.style.display = "inline";
        powfieldlabel.style.display = "inline";
      } else {
        powfieldinput.style.display = "none";
        powfieldlabel.style.display = "none";
      }
    }
  });
  advSelect.addEventListener("change", function() {
    runCalc();
  });
  //================================================
  function addAttack(){
    const newAttack = document.createElement("div");  //declares a new row for the inputs
    newAttack.className = "fullAttack";
    newAttack.id = attackID


    const newAttackRow1 = document.createElement("div");  //declares a new row for the inputs
    newAttackRow1.className = "topsinglerow";
    newAttackRow1.id = attackID + "row1";

    const newAttackRow2 = document.createElement("div");  //declares a new row for the inputs
    newAttackRow2.className = "botsinglerow";
    newAttackRow2.id = attackID + "row2";

    const newHit = document.createElement("input");  //creates to-hit textbox
    newHit.type = "number";
    newHit.className = "innum";
    newHit.id = "tohit" + attackID;

    const newDmg = document.createElement("input");  //damage textbox
    newDmg.type = "text";
    newDmg.className = "intext";
    newDmg.id = "dmg" + attackID;

    const attackNum = document.createElement("input");  //attacks textbox
    attackNum.type = "number";
    attackNum.className = "innum";
    attackNum.id = "attacknum" + attackID;

    const newCritch = document.createElement("input");  //crit chance textbox
    newCritch.type = "number";
    newCritch.className = "innum";
    newCritch.id = "critchance" + attackID;
    if (critchCheckbox.checked) {
      newCritch.style.display = "inline";
    } else {
      newCritch.style.display = "none";
    }

    const newCritform = document.createElement("input");  //crit damage textbox
    newCritform.type = "text";
    newCritform.className = "intext";
    newCritform.id = "critdamage" + attackID;
    if (critdCheckbox.checked) {
      newCritform.style.display = "inline";
    } else {
      newCritform.style.display = "none";
    }

    var powerAttackBox = document.createElement("input");
    powerAttackBox.type = "checkbox";
    powerAttackBox.id = "powatt"+attackID;
    powerAttackBox.value = "powatttoggle";
    powerAttackBox.name = "powatts";
    if (powFieldBox.checked){
      powerAttackBox.style.display = "inline";
    } else {
      powerAttackBox.style.display = "none";
    }

    var deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton"+attackID;
    deleteButton.name = "deleter";
    deleteButton.type = "button";
    deleteButton.className = "deleteButton";
    //deleteButton.innerHTML = "Remove";

    const newHitLabel = document.createElement("label");  //creates labels for all above fields
    newHitLabel.textContent = "To-hit Modifier: ";
    const newDmgLabel = document.createElement("label");
    newDmgLabel.textContent = " Damage Formula: ";
    const newAttLabel = document.createElement("label");
    newAttLabel.textContent = " Number of Attacks: ";

    const newCritchLabel = document.createElement("label");
    newCritchLabel.id = "critchlabel" + attackID;
    newCritchLabel.textContent = " Crit Chance (decimal): ";
    if (critchCheckbox.checked) {
      newCritchLabel.style.display = "inline";
    } else {
      newCritchLabel.style.display = "none";
    }

    const newCritformLabel = document.createElement("label");
    newCritformLabel.id = "critdmglabel" + attackID;
    newCritformLabel.textContent = " Crit Damage: ";
    if (critdCheckbox.checked) {
      newCritformLabel.style.display = "inline";
    } else {
      newCritformLabel.style.display = "none";
    }

    const powAttLabel = document.createElement("label");
    powAttLabel.id= "powattlabel"+attackID;
    powAttLabel.textContent = "Power attacks";
    if (powFieldBox.checked){
      powAttLabel.style.display = "inline";
    } else {
      powAttLabel.style.display = "none";
    }

    newAttackRow1.appendChild(deleteButton);
    newAttackRow1.appendChild(newHitLabel);
    newAttackRow1.appendChild(newHit);
    newAttackRow1.appendChild(newDmgLabel);
    newAttackRow1.appendChild(newDmg);
    newAttackRow1.appendChild(newAttLabel);
    newAttackRow1.appendChild(attackNum);

    newAttackRow2.appendChild(newCritchLabel);
    newAttackRow2.appendChild(newCritch);
    newAttackRow2.appendChild(newCritformLabel);
    newAttackRow2.appendChild(newCritform);
    newAttackRow2.appendChild(powerAttackBox);
    newAttackRow2.appendChild(powAttLabel);

    newAttack.appendChild(newAttackRow1);
    newAttack.appendChild(newAttackRow2);

    idList.push(attackID);
    // console.log(idList);

    attackContainer.appendChild(newAttack);
    attackID++;

    // console.log("newAttack ID: " + newAttack.id);
    var newDelButton = document.getElementById(deleteButton.id);
    newDelButton.addEventListener("click", function() {
      removeAttack(newAttack.id);
    });

    var newPowAtt = document.getElementById(powerAttackBox.id);
    newPowAtt.addEventListener("change", runCalc);
  }
  //================================================
  function removeAttack(idNum){
    console.log("ID to remove: " + idNum);
    attackRow = document.getElementById(idNum);
    if (idList.length > 1) {
      idIndex = idList.indexOf(parseInt(idNum,10));
      if (idIndex != -1) {
        console.log("Index being removed: " + idIndex);
        idList.splice(idIndex, 1);
        attackContainer.removeChild(attackRow);
        console.log("List after removal: " + idList);
        runCalc();
      } else {
        console.log("Index not found!");
      }
    }
  }
  //================================================
  function runCalc(){
    var levelElement = document.getElementById("level");
    levelval = parseFloat(levelElement.value);
    const selectedAdv = document.getElementById("advStateList");
    const advval = selectedAdv.value;
    var total = 0;

    for (var j = 0; j < idList.length; j++){
      i = idList[j];

      var deflevel = 1;      //sets defaults
      var deftohit = 5;
      var defdmgform = "1d8+3";
      var defattacks = 1;
      var defcritch = 0.05;

      /* powAttId = "powatt" + i;
      console.log("PowAttID = " + powAttId); */
      var myPowAtt = document.getElementById("powatt" + i);
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // takes in inputs
      var tohitElement = document.getElementById("tohit" + i);
      var dmgformElement = document.getElementById("dmg" + i);
      var attacksElement = document.getElementById("attacknum" + i);
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      tohitval = parseFloat(tohitElement.value);
      dmgformval = dmgformElement.value;
      attacksval = parseFloat(attacksElement.value);

      if ((isNaN(levelval)) || ((levelval < 1)||(levelval > 20))) {              //defaults all variables if they are empty
        levelval = deflevel;
        levelElement.value = deflevel;
      }
      if (isNaN(tohitval)) {              
        tohitval = deftohit;
        tohitElement.value = deftohit;
      }

      if (dmgformval == "") {
        dmgformval = defdmgform;
        dmgformElement.value = defdmgform;
      }

      if ((isNaN(attacksval))||(attacksval < 0)) {
        attacksval = defattacks;
        attacksElement.value = defattacks;
      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      formResult = dmgParse(dmgformval);    //calls damage formula parse function
      dmgdice = formResult.dice;     // sets dmgDice to damage dice average from formula
      dmgmods = formResult.mods;     // sets dmgMods to modifiers from formula
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      if (critchCheckbox.checked) {
        critchElement = document.getElementById("critchance" + i);
        critchval = parseFloat(critchElement.value);
        if ((isNaN(critchval))||((critchval < 0)||(critchval > 1))) {
          critchval = defcritch;
          critchElement.value = defcritch;
        }
      } else {
        critchval = defcritch;
      }

      if (critdCheckbox.checked) {
        critdmgElement = document.getElementById("critdamage" + i);  
        critdmgval = critdmgElement.value;
        if (critdmgval == "") {
          truecrit = dmgdice;
          critdmgElement.value = getdmgdice(dmgformval);
        } else {
          parsecrit = dmgParse(critdmgval);    
          truecrit = parsecrit.dice + parsecrit.mods;
        }
      } else {
        truecrit = dmgdice;
      }

      if (myPowAtt.checked) {
        tohitval = tohitval-5;
        dmgmods = dmgmods + 10;
      }
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      var truehit = parseFloat(findtruehit(tohitval, levelval, advval));
      //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      /* var dpr = attacksval * ((truehit * (dmgdice + dmgmods)) + (critch * critdmgval)); // Actual calculation for DPR  */
      var dpr = attacksval * ((truehit * (dmgdice + dmgmods)) + (critchval * truecrit));  
      total = total + dpr;
    } 
    var roundedDpr = parseFloat(total.toFixed(1));
    var dprval = document.getElementById("result");
    // Set the innerHTML of the element to display the value
    dprval.innerHTML = "Character DPR: " + roundedDpr;
  }
  //================================================
  function dmgParse(dmgstr) {         //parses damage input into damage dice and damage modifiers
    dmgstr = dmgstr.replace(/ /g, "");            // remove spaces
    dmgstr = dmgstr.toLowerCase();
    templist = [];    // initialize empty list, as well as dice and modifier results
    var dice = 0;
    var mods = 0;

    if (dmgstr.indexOf('+') !== -1) {             //run only if there are '+'s
      var dmglist = dmgstr.split('+');            //split into array of strings between '+'s
      for (var i = 0; i < dmglist.length; i++) {   //iterate through list
        if (dmglist[i].indexOf('d') !== -1) {
          templist = dmglist[i].split('d');
          dice = dice + (parseFloat(templist[0]) * ((parseFloat(templist[1]) / 2) + 0.5));    // whenever encounter "XdY", adds average of dice to dice damage total
        } else {
          mods = mods + parseFloat(dmglist[i]);    // adds modifier to total modifers
        }
      }
    } else {
      if (dmgstr.indexOf('d') !== -1) {
        templist = dmgstr.split('d');
        dice = dice + (parseFloat(templist[0]) * ((parseFloat(templist[1]) / 2) + 0.5));
      } else {
        mods = mods + parseFloat(dmgstr);
      }
    }
    return { dice, mods };    // returns both dice and modifier totals
  }
  function getdmgdice(dmgstr) {
    var dmgstr = dmgstr.replace(/ /g, ""); 
    var dice = 0;

    if (dmgstr.indexOf('+') !== -1) {             //run only if there are '+'s
      var dmglist = dmgstr.split('+');            //split into array of strings between '+'s
      for (var i = 0; i < dmglist.length; i++) {   //iterate through list
        if (dmglist[i].indexOf('d') == -1) {
          dmglist.splice(i, 1);
        } 
        dice = dmglist.join('+');
      }
    } else {
      if (dmgstr.indexOf('d') !== -1) {
        dice = dmgstr;
      } else {
        dice = 0
      }
    }
    return dice;
  }
  function findtruehit(hitbonus, charlevel, rollstate) {
    var bounded = [5, 5, 5, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11];

    truehitrate = 0.65 + (0.05 * (hitbonus - bounded[charlevel-1]));
    if (rollstate == "disadvantage"){
      truehitrate = truehitrate ** 2;
    } else if (rollstate == "advantage"){
      truehitrate = 1 - ((1 - truehitrate) ** 2);
    } else if (rollstate == "elvenAccuracy"){
      truehitrate = 1 - ((1 - truehitrate) ** 3);
    }

    return truehitrate;
  }
  //================================================
  addAttackBtn.addEventListener("click", addAttack);
  calcBtn.addEventListener("click", runCalc);
});

