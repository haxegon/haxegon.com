/*
  node.js script for building documentation for haxegon.com

  run "node builddocs.js" on your command line to generate to the output/ folder
*/
var versionname = "0.13.0";

var ncp = require('ncp').ncp;
var fs = require('fs');
eval(fs.readFileSync('./commandlist.js')+'');
require('./assets/lib/js/tools.js')();
CodeMirror = require('./assets/lib/js/addon/runmode/runmode.node.js');
haxe = require('./assets/lib/js/codemirror/haxe.js');

var modules = [];
var enums = [];
haxeHintArray = haxeHintArray.concat(haxeMethodArray);

var pageContents = "";

for (var i=0;i<haxeHintArray.length;i++){
  var r = haxeHintArray[i];
  if (r.length<3){
    continue;
  }
  var fn = r[0]+r[1];
  var dotIndex=fn.indexOf(".");
  if (dotIndex>0){
    moduleName = fn.substring(0,dotIndex);
    if (modules.indexOf(moduleName)===-1){
      modules.push(moduleName);
      if (r[2]==="E"||r[2]==="Col"){
        enums.push(moduleName);
      }
    }
  }
}

function highlight(text){
  var result="<div class='Codemirror cm-s-default'>";
  function f(token,style,c,d,e){
          if (token=="\n"){
                  result+="<br>";
          } else if (token.trim().length==0){
                  for (var i=0;i<token.length;i++){
                          result+="&nbsp;";
                  }
          } else {
                  result+="<span class='cm-"+style+"'>"+token+"</span>";
          }
  }
  CodeMirror.runMode(text, "haxe",f);
  result+="</div>";
  return result;
}

function splitTutorialTxt(s){
  var lines = s.split("\n");
  var result=[""];
  var state=0;
  for (var i=0;i<lines.length;i++){
    var l = lines[i];
    if (l.length>0&&l[0]=="-"){
      result.push("");
      state=1-state;
      continue;
    }
    if (result[result.length-1].length>0){
      if (state==0){
        result[result.length-1]+="<br>";
      } else {
        result[result.length-1]+="\n";
      }
    }
    result[result.length-1]+=l;
  }
  return result;
}

function splittxt(s){
  var lines = s.split("\n");
  var result = [""];
  var state = "text";

  for (var i = 0; i < lines.length; i++){
    var l = lines[i];
    var finalline = "";
    if(l.length > 0){
      //Simple markup
      var bold = false;
      for(var j = 0; j < l.length; j++){
        if(l.charAt(j) == '*'){
          if(!bold){
            finalline += '<b>';
          }else{
            finalline += '</b>';
          }
          bold = !bold;
        }else{
          finalline += l.charAt(j);
        }
      }
      if (result[result.length - 1].length > 0){
        if (state == "text"){
          result[result.length - 1] += "<br>";
        }
      }
    }

    result[result.length-1] += finalline;
  }
  return result;
}

/* Given moduleName, generate and return as a string the actual contents of that module */
function genpagecontents(moduleName){
  pageContents = "";
  var oldPreface="";
  var enumContents ="<div id='enumFrame'>";

  if (moduleName==="Col"){
    enumContents ="<div id='colorFrame'>";
  } else if (moduleName==="Font"){
    enumContents="<table>"
  }
  var enumAdded=false;
  var counter=0;
  for (var i=0;i<haxeHintArray.length;i++){
    var r = haxeHintArray[i];
    if (r.length<3){
      continue;
    }
    var tag = r[2];
    var fn = r[0]+r[1];

    var doc =(r.length>3)?r[3]:"";
    var dotIndex=fn.indexOf(".");
    var preface=dotIndex>=0?fn.substring(0,dotIndex):tag;
    var postface=dotIndex>=0?fn.substring(dotIndex+1):tag;
    if (fn.indexOf(moduleName)!==0){
      continue;
    }

    if(moduleName == "S") {
      if(r[0].indexOf(".") != 1) continue;
    }

    if (tag.substr(0,2)==="M_"){
      if (moduleName==="String"){
        fn = '"abc"'+"."+postface;
      } else if (moduleName==="Array"){
        fn = '[1,2,3]'+"."+postface;
      }
    }

    if (moduleName==="extraCol"){
      fn = 'Col'+"."+postface;
    }

    counter++;
    var row = '<tr class="' +  ((counter%2==0)?"even":"odd")+'">';
    if (preface!=oldPreface&&pageContents.length>0){
      row = "<tr style='border-top:5px solid black;'>";
    }
    var docString="";
    var cs = "";
    if (enums.indexOf(preface)===-1){
      var suffixes=["",".2",".3",".4",".5",".6"];
      for (var j=0;j<suffixes.length;j++){
        var suffix=suffixes[j];
        var samplePath = "examples/"+r[0]+suffix+".hx";
        if (!fs.existsSync(samplePath)){
          if (suffix.length==0){
            fs.writeFileSync(samplePath,"");
          } else {
            continue;
          }
        }
        cs = fs.readFileSync(samplePath);
        if (cs.length>0){
          var formatted = highlight(cs+"");
          docString+="<div class=\"codeInsert\">"+formatted+"</div>";
        }
      }
    }
    //row+=<td>"+tag+"</td>;
    row+="<td><div class=\"funcdec\">" + highlight(fn+"")+"</div>";
    if (doc.length>0){
      row+="<div class='docLine'>"+doc+"</div>";
    }
    row+="<div>"+docString+"</div></td></tr>";
    pageContents+=row;
    oldPreface=preface;
    if (moduleName==="Col"){

      if (enumAdded){
        enumContents+=" <wbr>";
      }
      enumContents+="<span class='Col_"+postface+" colbubble'>"+postface+"</span>";
    } else if (moduleName==="Font"){

      var row = '<tr class="' +  ((counter%2==0)?"even":"odd")+'">';
      doc = doc.replace("images/fonts/","../images/fonts/black_")
      doc = doc.replace("<img","<img style='padding-top:20px; padding-bottom:20px;padding-left:5px;padding-right:10px;'");
      doc = "<div style='text-align:center;padding:5px;background:white;border-radius:5px;border:1px solid gray;'>"+doc+"</div>"
      enumContents+=row+"<td >"+postface+"<p>"+doc+"</td></tr>";

    }else {
      if (enumAdded){
        enumContents+=", <wbr>";
      }
      enumContents+=postface;
    }
    enumAdded=true;
  }

  if (moduleName==="Font"){
    enumContents+="</table>"
   } else {
    enumContents+="</div>";
  }

  return enumContents;
}

function genDocsPage(moduleName){
  var pageHeader = "<!DOCTYPE html>"+
  "<html>"+
  "<head>"+
  ' <meta charset="utf-8">'+
  " <title>Haxegon Documentation"+"</title>"+
  '<link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon">'+
  '<link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">'+
  "<link href='https://fonts.googleapis.com/css?family=Lora:400,700' rel='stylesheet' type='text/css'>"+
  '<link rel="stylesheet" type="text/css" href="/assets/lib/css/referencestyle.css">'+
  '<link rel="stylesheet" type="text/css" href="/assets/lib/css/codemirror.css">'+
  '<script src="/assets/lib/js/codemirror/codemirror.js"></script>'+
  '<script src="/assets/lib/js/codemirror/haxe.js"></script>'+
  "</head>"+
  "<body>"+
  "<p><a href='/'>[ Home ]</a></p>"+
  "<p>"+
  "<h1>Library Documentation (v " + versionname + ")</h1>";

  var tableStart = "<table> "+" <tbody>";

  var tableEnd =  "</tbody>"+"</table>";

  var pageFooter = '</body>'+"</html>";

  var moduleHeader="<div class='navBar'>";
  for (var i=0;i<modules.length;i++){
    var m = modules[i];
    if (moduleHeader.length>0){
    }
    if(m.substr(0, 5) != "extra"){
      if (m===moduleName){
        moduleHeader+='<span class="moduleSelected">'+m+"</span>";
      } else {
        moduleHeader+='<a class="moduleButton" href="'+m.toLowerCase()+'.html">'+m+'</a>';
      }
    }
  }
  moduleHeader+="</div><p>";

  var thispageContents = "";
  if (moduleName==="Col"){
    var enumContents = genpagecontents("Col");
    thispageContents = enumContents;

    thispageContents += "<br />" + tableStart;
    enumContents = genpagecontents("extraCol");
    thispageContents += pageContents;
  }else if (moduleName==="Key"){
    var enumContents = genpagecontents("Key");
    thispageContents = enumContents;
  }else{
    var enumContents = genpagecontents(moduleName);
    thispageContents += pageContents;
  }

  var tableHeader = "<h3 class='moduleHeader'>"+ moduleName+"</h3><p>";

  var moduleDescription="";
  if (moduleDescriptions.hasOwnProperty(moduleName) && moduleDescriptions[moduleName].length>0){
    moduleDescription = '<div class="moduleDescription">'+moduleDescriptions[moduleName]+'</div>'
  }

  if (moduleName.length>0){
    var wholePage = pageHeader+moduleHeader+tableHeader+moduleDescription+tableStart+thispageContents+tableEnd+pageFooter;
    fs.writeFileSync("docs/"+moduleName.toLowerCase()+".html",wholePage);
  } else {
    var wholePage = pageHeader+moduleHeader+pageFooter;
    fs.writeFileSync("docs/index.html",wholePage);
  }
}

//Create folder structure if needed
if (!fs.existsSync("docs")){ fs.mkdirSync("docs"); }

for (var i=0;i<modules.length;i++){
  genDocsPage(modules[i]);
}
