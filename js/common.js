var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  dropdownContent.style.display = "none";
  } else {
  dropdownContent.style.display = "block";
  }
  });
}


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//importing file system library
var fs = require('fs');

function ajaxReturn(url) {
  var req = new XMLHttpRequest();
  req.open("GET", url,false);
  req.send(null);

  if (req.status === 200) {
    return req.responseText;
  }
}

function getDate(){
  var d = new Date();
  return d.getDay()+"-"+d.getMonth()+"-"+d.getFullYear();
}

function initJSON(url,name) {
  var json = ajaxReturn(url);
  var dls = JSON.parse(json);

  var allTags = {};
  allTags.name = name;
  allTags.versions = [];

  dls.forEach(function(version){
      var aVersion = getTag(version);
      allTags.versions.push(aVersion);
  });

  return allTags;
}

function ajaxGet(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback(req.responseText);
      } else {
          console.error(req.status + " " + req.statusText + " " + url);
      }
  });
  req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}

function displayData(url,elt) {
  var req = new XMLHttpRequest();
  req.open("GET", url,false);
  req.send(null);
  var dataJSON = JSON.parse(req.responseText);

  dataJSON.versions.forEach(function (version) {
    var sublist = "";
    version.allOS.forEach(function(os){
      sublist = sublist + "<li>" + os.name + " - " + os.download_count + "</li>";
      histolist = "";
      // for each
      os.history.forEach(function(histo) {
        histolist = histolist + "<li>" + histo.date + " - " + histo.dl + "</li>";
      })
      sublist = sublist + "<ul>" + histolist + "</ul>";
    });

    elt.innerHTML = elt.innerHTML + "<li> <b>" + version.name+ "</b> - "+ version.download_count +"</li>";
    elt.innerHTML = elt.innerHTML + "<ul><details><summary style=\"display: list-item;\">Details</summary>" + sublist + "</details></ul>";
  });
}