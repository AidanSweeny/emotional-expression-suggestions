var buttons = false;
var nextPage = 2;
var prevPage = 0;
var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&with_original_language=en&include_adult=false";
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
            if (response.results[i].poster_path !== null){
                poster.attr("src", "https://image.tmdb.org/t/p/w500"  + response.results[i].poster_path);
            }
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
    });
}

$("#movieSearch").on("click", function(event) {
    $("#results").empty();
    event.preventDefault();
    var year = $("#year").val()
    var genre = $("#genre").val();
    console.log(genre);
    var searchBy = $("#searchBy").val();
    queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&with_original_language=en&include_adult=false&page=1";
    if (genre !== "Genre"){
        queryURL += "&with_genres=" + genre;
    }
    if(year === ""){
        queryURL = queryURL;
    }
    else if (year.length !== 4){
        $("#error").text("Please enter a valid year");
        return;
    }
    else if(year !== ""){
        queryURL += "&year=" + year;
        $("#error").text("");
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
    if (buttons === false){
        var next = $("<button>");
        $("#pageTag").text("Page " + (nextPage-1));
        next.text("Next Page");
        next.attr("class", "btn nextPage");
        var prev = $("<button>");
        prev.text("Previous Page");
        prev.attr("class", "prevPage btn");
        $("#pages").append(prev, next);
        buttons = true;
    }
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

$("#pages").on("click", "button.nextPage", function(event){
    queryURL += "&page=" + nextPage;
    window.scrollTo(0, 0);
    querySearch();
    nextPage = nextPage + 1;
    prevPage = prevPage + 1;
    $("#pageTag").text("Page " + (nextPage-1));
})

$("#pages").on("click", "button.prevPage", function(event){
    queryURL += "&page=" + prevPage;
    window.scrollTo(0, 0);
    querySearch();
    nextPage = nextPage - 1
    prevPage = prevPage - 1;
    $("#pageTag").text("Page " + (nextPage-1));
})

$("#randomButton").on("click", function(event) {
    event.preventDefault();
    var year = $("#year").val()
    var genre = $("#genre").val();
    console.log(genre);
    var searchBy = $("#searchBy").val();
    queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&with_original_language=en&include_adult=false&page=1";
    if (genre !== "Genre"){
        queryURL += "&with_genres=" + genre;
    }
    if(year === ""){
        queryURL = queryURL;
    }
    else if (year.length !== 4){
        $("#error").text("Please enter a valid year");
    }
    else if(year !== ""){
        queryURL += "&year=" + year;
        $("#error").text("");
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
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#results").empty();
        console.log(response);
        var ran = Math.floor(Math.random() * response.results.length) + 1;
        var div = $("<div>");
        var movieTitle = $("<h2>");
        movieTitle.text(response.results[ran].title);
        var poster = $("<img>");
        poster.css("width", "500px");
        if (response.results[ran].poster_path !== null){
            poster.attr("src", "https://image.tmdb.org/t/p/w500"  + response.results[ran].poster_path);
        }
        var movieGenre = $("<ul>");
        if(response.results[ran].genre_ids.length > 0){
            movieGenre.text("Genres: ");
            for(var j=0; j<response.results[ran].genre_ids.length; j++){
                var li = $("<li>");
                li.text(genres[response.results[ran].genre_ids[j]]);
                movieGenre.append(li);
            }
        }
        var releaseDate = $("<p>");
        releaseDate.text("Release Date: " + response.results[ran].release_date);
        div.append(movieTitle, poster, movieGenre, releaseDate);
        $("#results").append(div);
    });

});