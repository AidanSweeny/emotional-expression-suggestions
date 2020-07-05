var buttons = false;
var nextURL = "";
var prevURL = "";
var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&include_adult=false&page=1";
var genres = {28: "Action", 12 : "Adventure", 35 : "Comedy", 80 : "Crime", 18 : "Drama", 14: "Fantasy", 16 : "Animation", 99: "Documentary", 27: "Horror", 9648 : "Mystery", 36 : "History", 10751 : "Family", 10749 : "Romance", 10402 : "Music", 10770 : "TV Movie", 10752 : "War", 53 : "Thriller", 37 : "Western", 878 : "Science Fiction"}
function querySearch(){
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#results").empty();
        console.log(response);
        for(var i=0; i<response.results.length; i++){ 
            var div = $("<div>");
            var movieTitle = $("<h2>");
            movieTitle.text(response.results[i].title);
            var poster = $("<img>");
            poster.css("width", "200px");
            poster.attr("src", "https://image.tmdb.org/t/p/w500"  +response.results[i].poster_path);
            var movieGenre = $("<ul>");
            if(response.results[i].genre_ids.length > 0){
                movieGenre.text("Genres: ");
                for(var j=0; j<response.results[i].genre_ids.length; j++){
                    var li = $("<li>");
                    li.text(genres[response.results[i].genre_ids[j]]);
                    movieGenre.append(li);
                }
            }
            var releaseDate = $("<p>");
            releaseDate.text("Release Date: " + response.results[i].release_date);
            div.append(movieTitle, poster, movieGenre, releaseDate);
            $("#results").append(div);
        }
        nextURL = response.next
        prevURL = response.previous
    });
}

$("#movieSearch").on("click", function(event) {
    $("#results").empty();
    event.preventDefault();
    var year = $("#year").val()
    var genre = $("#genre").attr("value");
    console.log(genre);
    var searchBy = $("#searchBy").val();
    queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&include_adult=false&page=1";
    if (genre !== "Genre"){
        queryURL += "&with_genres=" + genre;
    }
    if(year !== ""){
        queryURL += "&year=" + year;
    }
    if (searchBy == "Alphabetically(A-Z)"){
        queryURL += "&sort_by=original_title.asc";
    }
    else if (searchBy == "Alphabetically(Z-A)"){
        queryURL += "&sort_by=original_title.desc";
    }
    else if (searchBy == "Release Date(new-old)"){
        queryURL += "&sort_by=primary_release_date.desc";
    }
    else if (searchBy == "Release Date(old-new)"){
        queryURL += "&sort_by=primary_release_date.asc";
    }
    else if (searchBy == "Revenue"){
        queryURL += "&sort_by=revenue.desc";
    }
    querySearch();
  });

$("#movieTitleSearch").on("click", function(event){
    event.preventDefault();
    var title = $("#title").val();
    $.ajax({
        url: "https://www.omdbapi.com/?t=" + title  +"&y=&plot=short&apikey=trilogy",
        method: "GET"
    }).then(function(response) {
        var title = $("<h2>");
        var poster = $("<img>");
        var plot = $("<p>");
        poster.attr("src", response.Poster);
        title.text(response.Title);
        plot.text(response.Plot);
        $("#results").append(title, poster, plot);
    });
})
