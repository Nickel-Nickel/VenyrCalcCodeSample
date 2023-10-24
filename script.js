document.addEventListener("DOMContentLoaded", function () {
  const attackContainer = document.getElementById("attacklist");
  const addAttackBtn = document.getElementById("addAttack")
  const removeAttackBtn = document.getElementById("removeAttack")
  const calcBtn = document.getElementById("doCalc")
  var critchCheckbox = document.getElementById("critch");
  var critdCheckbox = document.getElementById("critd");
  var powFieldBox = document.getElementById("powfield");
  var advSelect = document.getElementById("advStateList");
  var attackCount = 0;
  addAttack();

  //================================================
  critchCheckbox.addEventListener("change", function() {
    for (var i = 0; i < attackCount; i++){
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
    for (var i = 0; i < attackCount; i++){
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

    for (var i = 0; i < attackCount; i++){
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
    newAttack.className = "singlerow";
    newAttack.style.padding = "1px";

    const newHit = document.createElement("input");  //creates to-hit textbox
    newHit.type = "number";
    newHit.className = "innum";
    newHit.id = "tohit" + attackCount;

    const newDmg = document.createElement("input");  //damage textbox
    newDmg.type = "text";
    newDmg.className = "intext";
    newDmg.id = "dmg" + attackCount;

    const attackNum = document.createElement("input");  //attacks textbox
    attackNum.type = "number";
    attackNum.className = "innum";
    attackNum.id = "attacknum" + attackCount;

    const newCritch = document.createElement("input");  //crit chance textbox
    newCritch.type = "number";
    newCritch.className = "innum";
    newCritch.id = "critchance" + attackCount;
    if (critchCheckbox.checked) {
      newCritch.style.display = "inline";
    } else {
      newCritch.style.display = "none";
    }

    const newCritform = document.createElement("input");  //crit damage textbox
    newCritform.type = "text";
    newCritform.className = "intext";
    newCritform.id = "critdamage" + attackCount;
    if (critdCheckbox.checked) {
      newCritform.style.display = "inline";
    } else {
      newCritform.style.display = "none";
    }

    var powerAttackBox = document.createElement("input");
    powerAttackBox.type = "checkbox";
    powerAttackBox.id = "powatt"+attackCount;
    powerAttackBox.value = "powatttoggle";
    powerAttackBox.name = "powatts";
    if (powFieldBox.checked){
      powerAttackBox.style.display = "inline";
    } else {
      powerAttackBox.style.display = "none";
    }

    const newHitLabel = document.createElement("label");  //creates labels for all above fields
    newHitLabel.textContent = "To-hit Modifier: ";
    const newDmgLabel = document.createElement("label");
    newDmgLabel.textContent = " Damage Formula: ";
    const newAttLabel = document.createElement("label");
    newAttLabel.textContent = " Number of Attacks: ";

    const newCritchLabel = document.createElement("label");
    newCritchLabel.id = "critchlabel" + attackCount;
    newCritchLabel.textContent = " Crit Chance (decimal): ";
    if (critchCheckbox.checked) {
      newCritchLabel.style.display = "inline";
    } else {
      newCritchLabel.style.display = "none";
    }

    const newCritformLabel = document.createElement("label");
    newCritformLabel.id = "critdmglabel" + attackCount;
    newCritformLabel.textContent = " Crit Damage: ";
    if (critdCheckbox.checked) {
      newCritformLabel.style.display = "inline";
    } else {
      newCritformLabel.style.display = "none";
    }

    const powAttLabel = document.createElement("label");
    powAttLabel.id= "powattlabel"+attackCount;
    powAttLabel.textContent = "Power attacks";
    if (powFieldBox.checked){
      powAttLabel.style.display = "inline";
    } else {
      powAttLabel.style.display = "none";
    }



    newAttack.appendChild(newHitLabel);
    newAttack.appendChild(newHit);
    newAttack.appendChild(newDmgLabel);
    newAttack.appendChild(newDmg);
    newAttack.appendChild(newAttLabel);
    newAttack.appendChild(attackNum);
    newAttack.appendChild(newCritchLabel);
    newAttack.appendChild(newCritch);
    newAttack.appendChild(newCritformLabel);
    newAttack.appendChild(newCritform);
    newAttack.appendChild(powerAttackBox);
    newAttack.appendChild(powAttLabel);

    attackContainer.appendChild(newAttack);
    attackCount++;

    var newPowAtt = document.getElementById(powerAttackBox.id);
    newPowAtt.addEventListener("change", function(){
      runCalc();
    });
  }
  //================================================
  function removeAttack(){
    if (attackCount > 1) {
        attackContainer.removeChild(attackContainer.lastChild);
        attackCount--;
    }
  }
  //================================================
  function runCalc(){
    var levelElement = document.getElementById("level");
    levelval = parseFloat(levelElement.value);
    const selectedAdv = document.getElementById("advStateList");
    const advval = selectedAdv.value;
    var total = 0;

    for (var i = 0; i < attackCount; i++){
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
  removeAttackBtn.addEventListener("click", removeAttack);
  calcBtn.addEventListener("click", runCalc);
});

