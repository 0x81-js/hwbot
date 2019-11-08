
//---------------- vardef ----------------
const Discord = require('discord.js');
const client = new Discord.Client();
var msg;
const channelX = require("./config.json");
var hwjs;
var parsedHW = [];
const fs = require("fs");
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
var datetime = new Date().toISOString().split("T")[0];
console.log("[INFO] Current date: "+datetime);

//---------------- client ----------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  loadJSON();
  fl();

});

//---------------- functions ----------------

async function fl () {
  msg = await client.channels.get(channelX.channelID).fetchMessage(channelX.id);
  main();
}

function loadJSON() {
  hwjs = require("./hw.json");
  hwjs.forEach((e) => {
    if (e != undefined) {
      parsedHW[parsedHW.length] = new HW (e.subject,e.date,e.description,e.actualdate);
    }
  });
}

function saveJSON() {
  fs.writeFileSync("./hw.json",JSON.stringify(parsedHW,null,4));
}

//---------------- classes ----------------

class HW {
  constructor(subject,date,description,actualdate) {
    this.subject = subject;
    this.date = date;
    this.description = description;
    this.actualdate = actualdate;
    this.string;
  }
  generateText() {
    var stringF = (`FACH: ${this.subject}\nDATUM: ${this.date}\nBESCHREIBUNG: ${this.description}\n---------------------------\n`);
    //---------------------------\n
    if (stringF != undefined) {
          this.string = stringF;
    }
  }
}


//---------------- main function ----------------

function main() {
  //msg.edit("empty");
  //console.log(parsedHW.length);

  rl.question("Input Mode:\n a - add data\n e - delete data\n d - draw and save\n l - log array\n\n", (mode) => {
    switch (mode) {
      	case "a":
          //console.log("a");
          a();
          break;
        case "e":
          e();
          break;
        case "d":
          d();
          break;
        case "l":
          l();
          break;
        default:
          console.log("ERROR: Invalid input")
    };
  })

}

//---------------- executing functions ----------------

async function a () {
  var date;
  var desc;
  var subj;
  var real;
  rl.question("\nSubject?\n",(d) => {
      subj = d;
      rl.question("Date?\n",(d) => {
        date = d;
        rl.question("Real date?\n",(d) => {
          real = d;
          rl.question("Description?\n",(d) => {
            desc = d;
            parsedHW[parsedHW.length] = new HW(subj,date,desc,real)
            console.log();
            console.log("Data appended");
            console.log();
            main();
          })
        })
      })
  })
}

function e () {
  console.log("\nElements:");
  //console.log(parsedHW.length);
  console.log(parsedHW);
  rl.question("Enter element number to delete (starting 0)\n",(d) => {
    d = parseInt(d);

    if (typeof d == "number") {

      parsedHW.splice(d,1);
      console.log();
      //console.log(parsedHW.length);
      main();
    } else {
      console.log("ERROR: Not an number");
      console.log();
      main();
    }
  })
}

function d () {
  var fM = "";
  var id = -1;
  parsedHW.forEach((e) => {
    id++;
    /*console.log(e.actualdate)
    console.log(datetime);*/
    if (e.actualdate == datetime) {
      parsedHW.splice(id,1);
    } else {
      e.generateText();
      fM = fM + e.string;

    }
  })
  var updatedate = new Date().toString();
  if (fM != "") {
    msg.edit("ALLE ANGABEN OHNE GEWÄHR\n\n"+ fM +"\n**LETZES MAL AKTUALISIERT:  "+updatedate+"**");
  } else {
    msg.edit("Keine HÜ Eingetragen derzeit.");
  }
  saveJSON();
  main();
}

function l () {
  console.log();
  console.log(parsedHW);
  console.log();
  main();
}

//---------------- client token ----------------

client.login(channelX.token);
