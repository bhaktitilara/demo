window.onload = function () {
    // displayData();
    document.getElementById("send").click(function () {
        serchContent();
    });
};

var tagname;
function hideshow(elementId) {
    // var lblName = document.getElementById('lblName');
    // lblName.text (id);
    // var x = document.getElementById(elementId);
    // if (x.style.display === "none") {
    //      x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    document.getElementById("Search").style.display = "none";
    document.getElementById("Journalarticles").style.display = "none";
    // document.getElementById("main").style.display="none";
    document.getElementById(elementId).style.display = "block";
}


function displayData() {
    alert(1)
    console.log(1);
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var url = 'https://api.archives-ouvertes.fr/search/tel/';
    var req = new XMLHttpRequest();
    req.open("GET", url,false);
    req.send(null);
    var dataJSON = JSON.parse(req.responseText);
    console.log(dataJSON);
    dataJSON.versions.forEach(function (version) {
        console.log(dataJSON);
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
  
    //   elt.innerHTML = elt.innerHTML + "<li> <b>" + version.name+ "</b> - "+ version.download_count +"</li>";
    //   elt.innerHTML = elt.innerHTML + "<ul><details><summary style=\"display: list-item;\">Details</summary>" + sublist + "</details></ul>";
    });
  }

function getval(id) {
    tagname = id;
    document.getElementById('tagName').innerHTML = tagname;
    console.log(tagname);
    // serchContent();
}

function getDocuments() {
    // CREATE AN XMLHttpRequest OBJECT, WITH GET METHOD.
    var xhr = new XMLHttpRequest(),
        method = 'GET',
        overrideMimeType = 'application/json',
        url = 'https://api.archives-ouvertes.fr/search/tel/';        // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // PARSE JSON DATA.
            var birds = JSON.parse(xhr.responseText);
            console.log(birds);
            var ele = document.getElementById('Journalarticles');
            var new_div;
            for (var i = 0; i < birds.response.docs.length; i++) {

                console.log(birds.response.docs[i].docid);
                console.log(birds.response.docs[i].label_s);

                new_div = document.createElement("div");
                new_div.className = "hello jumbotron  counter";
                // document.body.appendChild(new_div);
                new_div.append(birds.response.docs[i].label_s);
                ele.append(new_div);
            }

            $('#Journalarticles').on('click', '.counter', function () {
                // alert(1);
                $(this).css({ 'backgroundColor': '#87a396', 'color': '#FFF' });    // Change its style.

            });
        }
    };
    xhr.open(method, url, true);
    xhr.send();

}


function serchContent_new() {
    var searchval = document.getElementById("searchval").value;
    console.log(searchval);
    // var x = document.getElementById(elementId);

    var xhr = new XMLHttpRequest(),
        method = 'GET',
        overrideMimeType = 'application/json',
        url = 'https://api.archives-ouvertes.fr/search/?q=title_t:%22' + searchval + '%22&wt=xml';        // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            var xmlDoc = xhr.responseXML;
            console.log(xmlDoc);
            var node, childNodes = xmlDoc.documentElement.childNodes;

            console.log(childNodes);
            console.log(childNodes[1].nodeName);
            console.log(childNodes[1].childNodes[0].nodeValue);

            console.log(xmlDoc.getElementsByTagName("doc")[0].childNodes[1].textContent);
            var ele = document.getElementById('data');
            var new_div;
            $('#data').empty();
            if (childNodes.length > 0) {
                for (var i = 0; i < childNodes.length; i++) {

                    new_div = document.createElement("div");
                    new_div.className = "hello jumbotron  counter ";
                    // document.body.appendChild(new_div);
                    new_div.append(xmlDoc.getElementsByTagName("doc")[i].childNodes[1].textContent);
                    ele.append(new_div);

                }
            }
            $('#Search').on('click', '.counter', function () {
                // alert(1);
                $(this).css({ 'backgroundColor': '#87a396', 'color': '#FFF' });    // Change its style.

            });
        }
    };
    xhr.open(method, url, true);
    xhr.send();

}

function serchContent() 
{ 
        var searchval = document.getElementById("searchval").value ;// $("#searchval").val();
        console.log('searchval ' + searchval);
        if(searchval == '')
        {
            searchval = '*';            
        }
        console.log(searchval);
        console.log(tagname);
        // var x = document.getElementById(elementId);
        var url_address;
       
        if(tagname=='Journalarticles')
        {          
               
            url_address= 'http://api.archives-ouvertes.fr/ref/journal/?q=*' + searchval +'*&wt=json&indent=true';    
            console.log(url_address);  
        }
        else if(tagname=='Search')
        {    document.getElementById("tagName").value = tagname;
            url_address='https://api.archives-ouvertes.fr/search/?q=*' + searchval +'*&wt=json';
        } 
        else if(tagname=='Authors')
        {   
            // getAuthors();
            url_address='https://api.archives-ouvertes.fr/ref/author/?q=*' + searchval +'*&wt=json'; 
            
        }
        var xhr = new XMLHttpRequest(), 
            method = 'GET',
            overrideMimeType = 'application/json',
            url = url_address;        // ADD THE URL OF THE FILE.
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    // PARSE JSON DATA.
                    var birds = JSON.parse(xhr.responseText);
                    console.log(birds);
                    var ele = document.getElementById('data');
                    var new_div;
                    $('#data').empty();
                    $('#tagName').val(tagname);
                   
                    for (var i = 0; i < birds.response.docs.length; i++) {
                        
                        console.log(birds.response.docs[i].docid);
                        console.log(birds.response.docs[i].label_s);
        
                        new_div = document.createElement("div");
                        new_div.className = "hello jumbotron container main counter";
                        // document.body.appendChild(new_div);
                        new_div.append(birds.response.docs[i].label_s);
                        ele.append(new_div);
                    }
        
                    $('#data').on('click', '.counter', function (e) {
                        // alert(1);
                        $(this).css({ 'backgroundColor': '#87a396', 'color': '#FFF' });    // Change its style.
                        // alert("elementid: " + $(this));
                        console.log($(this));
                        console.log($(this).context.innerHTML);
                        if(tagname=='Authors'){
                            var authourName = $(this).context.innerHTML;
                            // getAuthorsDetails(authourName) ;
                            window.open("/publication.html?name="+authourName);
                        }
        
                    });
                }
            };
            xhr.open(method, url, true);
            xhr.send();       
        $('#searchval').val('');
}


function getAuthorsDetails(authourName) 
{ 
        var array = authourName.split(" ");
        var firstName = array[0],lastName = array[1];
       console.log(firstName);
       console.log(lastName);
        var xhr = new XMLHttpRequest(), 
            method = 'GET',
            overrideMimeType = 'application/json',
            url = 'https://api.archives-ouvertes.fr/search/authorstructure/?firstName_t=' + firstName 
            +'&lastName_t='+ lastName +'&wt=json'; ;        // ADD THE URL OF THE FILE.
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    // PARSE JSON DATA.
                    var birds = JSON.parse(xhr.responseText);
                    console.log(birds);
                    var ele = document.getElementById('data');
                    var new_div;
                    $('#data').empty();
                    $('#tagName').val(tagname);
                   
                    for (var i = 0; i < birds.response.result.org.length; i++) {
                        
                        console.log(birds.response.result.org[i].orgName);
                        console.log(birds.response.result.org[i].desc);
        
                        new_div = document.createElement("div");
                        new_div.className = "hello jumbotron container main counter";
                        new_div.append(birds.response.result.org[i].label_s);
                        ele.append(new_div);
                    }
        
                    // $('#data').on('click', '.counter', function () {
                    //     // alert(1);
                    //     $(this).css({ 'backgroundColor': '#87a396', 'color': '#FFF' });    // Change its style.
                    //     if(tagname=='Authors'){
                            
                    //     }
        
                    // });
                }
            };
            xhr.open(method, url, true);
            xhr.send();       
        $('#searchval').val('');
}


function getJournalarticleswithoutsearch() {
    // CREATE AN XMLHttpRequest OBJECT, WITH GET METHOD.
    var xhr = new XMLHttpRequest(),
        method = 'GET',
        overrideMimeType = 'application/json',
        url = 'http://api.archives-ouvertes.fr/ref/journal';        // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // PARSE JSON DATA.
            var birds = JSON.parse(xhr.responseText);
            console.log(birds);
            var ele = document.getElementById('data');
            var new_div;
            for (var i = 0; i < birds.response.docs.length; i++) {

                console.log(birds.response.docs[i].docid);
                console.log(birds.response.docs[i].label_s);

                new_div = document.createElement("div");
                new_div.className = "hello jumbotron  counter";
                // document.body.appendChild(new_div);
                new_div.append(birds.response.docs[i].label_s);
                ele.append(new_div);
            }

            $('#data').on('click', '.counter', function () {
                // alert(1);
                $(this).css({ 'backgroundColor': '#87a396', 'color': '#FFF' });    // Change its style.

            });
        }
    };
    xhr.open(method, url, true);
    xhr.send();

}

function getJournalarticles() {
    var searchval = document.getElementById("searchval").value;// $("#searchval").val();
    console.log(searchval);

    var xhr = new XMLHttpRequest(),
        method = 'GET',
        overrideMimeType = 'application/json',
        url = 'http://api.archives-ouvertes.fr/ref/journal/?q=text:' + searchval + '&wt=xml&indent=true';        // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {

            var xmlDoc = xhr.responseXML;
            console.log(xmlDoc);
            var node, childNodes = xmlDoc.documentElement.childNodes;

            console.log(childNodes);
            console.log(childNodes[1].nodeName);
            console.log(childNodes[1].childNodes[0].nodeValue);

            console.log(xmlDoc.getElementsByTagName("doc")[0].childNodes[1].textContent);
            var new_div;
            for (var i = 0; i < childNodes.length; i++) {
                node = childNodes[i];
                new_div = document.createElement("div");
                new_div.className = "hello jumbotron container main";
                document.body.appendChild(new_div);
                new_div.append(xmlDoc.getElementsByTagName("doc")[i].childNodes[1].textContent);

            }

            // new_div.click(function(){
            //         alert(1);
            // });
        }
    };
    xhr.open(method, url, true);
    xhr.send();
}

