// var Song = Backbone.Model.extend();
// var Songs = Backbone.Collection.extend({
//     model: Song,
//     url: "http://image.tmdb.org/t/p/w300/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg"
// });

// var songs = new Songs();
// songs.fetch();


function Movies(coming) {
    if (coming == 'Popular') {
        callApi('https://api.themoviedb.org/3/movie/popular?api_key=7826b828b8971b2adc0e3801578e24c7&language=en-US&page=1')
    } else {
        callApi('https://api.themoviedb.org/3/movie/upcoming?api_key=7826b828b8971b2adc0e3801578e24c7&language=en-US&page=1')
    }
    console.log(coming);

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(coming).className = "tablinks active";
}
Movies("Popular");

function callApi(url) {
    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                let value = '';
                response.json().then(function (data) {

                    console.log(data);
                    for (let i = 0; i < data.results.length; i++) {
                        console.log(data.results[i].poster_path);
                        const baseurl = "http://image.tmdb.org/t/p/";
                        let imgsize = "w500";
                        let imgurl = baseurl + imgsize + data.results[i].poster_path;
                        value += '<div class="card" id="imgbtn" onclick="btnimg(' + data.results[i].id + ')"><img src=' + imgurl + '  alt="movies"></div>';

                    }

                    document.getElementById("wrap").innerHTML = value;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
function search(element) {
    let input = document.getElementById('searchbar').value
    input = encodeURI(input.toLowerCase());
    getApi('https://api.themoviedb.org/3/search/movie?api_key=7826b828b8971b2adc0e3801578e24c7&language=en-US&query=' + input + '&page=1&include_adult=false');
    //alert(values);



}
function getApi(url) {
    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                let val = '';
                response.json().then(function (data) {

                    console.log(data);
                    for (let i = 0; i < data.results.length; i++) {
                        console.log(data.results[i].poster_path);
                        const baseurl = "http://image.tmdb.org/t/p/";
                        let imgsize = "w500";
                        let imgurl = baseurl + imgsize + data.results[i].poster_path;
                        val += '<div class="card" id="imgbtn" onclick="btnimg(' + data.results[i].id + ')"><img src=' + imgurl + '  alt="movies"></div>';

                    }

                    document.getElementById("wrap").innerHTML = val;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
/*movie details*/
function btnimg(content) {
    console.log(content);
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    fetch('https://api.themoviedb.org/3/movie/' + content + '?api_key=7826b828b8971b2adc0e3801578e24c7&language=en-US')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                let val = '';
                response.json().then(function (data) {

                    console.log(data);
                    if (data.backdrop_path) {
                        const baseurl = "http://image.tmdb.org/t/p/";
                        let imgsize = "w500";
                        let imgurl = baseurl + imgsize + data.backdrop_path;
                        let para = data.overview;
                        val += '<div class="detailedmovie"><img src=' + imgurl + '  alt="movies"><p class="moviedata">'+para+'</p></div>';
                    }



                    document.getElementById("getmodal").innerHTML = val;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

}



function closemodal() {
    
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

var context = {
    "name" : "Loading..."
  }
  
  var templateScript = Handlebars.templates['modal.hbs'];

  console.log("-->" ,templateScript(context));
  
  $("#demos").append(templateScript(context));