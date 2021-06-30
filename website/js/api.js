function serch_author() {
    var searchval = document.getElementById("search-term").value;

    var xhr = new XMLHttpRequest(),
        method = 'GET',
        overrideMimeType = 'application/json',
        url = 'https://api.archives-ouvertes.fr/search/?q=*' + searchval +'*&wt=json';      // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var details = JSON.parse(xhr.responseText);
           
            // var node, childNodes = xmlDoc.documentElement.childNodes;
            var ele = document.getElementById('data');
            var new_div;
            $('#data').empty();
          
                for (var i = 0; i < details.response.docs.length; i++) {
                    console.log(details.response.docs[i].label_s);
                    new_div = document.createElement("div");
                    new_div.className = "hello jumbotron  counter  ";
                    // document.body.appendChild(new_div);
                    new_div.append(details.response.docs[i].label_s);
                        ele.append(new_div);

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

function search_project() {
    var searchval = document.getElementById("search-term").value;
    $('#data').empty();
    //  $('#lblTitle').text('Project');
    document.getElementById('<%= lblTitle.ClientID %>').innerHTML = 'Project';
    var xhr = new XMLHttpRequest(),
        method = 'GET',
        overrideMimeType = 'application/json',
        url = 'http://api.archives-ouvertes.fr/ref/europeanproject/?q=*' + searchval +'*&wt=json';      // ADD THE URL OF THE FILE.

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var details = JSON.parse(xhr.responseText);
           
            // var node, childNodes = xmlDoc.documentElement.childNodes;
            var ele = document.getElementById('data');
            var new_div;
            $('#data').empty();
          
                for (var i = 0; i < details.response.docs.length; i++) {
                    console.log(details.response.docs[i].label_s);
                    new_div = document.createElement("div");
                    new_div.className = "hello jumbotron  counter  ";
                    // document.body.appendChild(new_div);
                    new_div.append(details.response.docs[i].label_s);
                        ele.append(new_div);

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