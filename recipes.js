function displayRecipe(recipe) {
    var div = $("#recipe-display");

    div.empty()

    div.append("<h4>" + recipe.title + "</h4>");
    div.append("<img src=\"" + recipe.image + "\">");

    // Display ingredients
    div.append("<h5> Ingredients </h5>");
    var ul = $("<ul>");
    var ingredients = recipe.extendedIngredients;

    div.append(ul);

    for (var i = 0; i < ingredients.length; i++) {
        ul.append("<li>" + ingredients[i].original + "</li>");
    }

    // Display instructions
    div.append("<h5> Instructions </h5>");
    for (var i = 0; i < recipe.analyzedInstructions.length; i++) {
        var ol = $("<ol>");
        var instructions = recipe.analyzedInstructions[i].steps;

        div.append("<h5>" + recipe.analyzedInstructions[i].name + "</h5>");
        div.append(ol);

        for (var j = 0; j < instructions.length; j++) {
            ol.append("<li>" + instructions[j].step + "</li>");
        }
    }

    // Display link to recipe
    div.append("<p>Source: <a target=\"_blank\" href=\"" + recipe.sourceUrl + "\">" + recipe.sourceName + "</a></p>")
}

// DISPLAY A RANDOM RECIPE

$("#random-recipe-btn").on("click", function() {
    axios.get('https://api.spoonacular.com/recipes/random?number=1&apiKey=ac075615bb0947ea8541206866406e74')
    .then((response) => {
        console.log(response);
        
        var recipe = response.data.recipes[0];

        console.log(recipe);

        $("#recipe-previews").empty();
        $("#error-message").empty();
        displayRecipe(recipe);
    })
})

// SEARCH FOR RECIPES BY SOME CRITERIA, DISPLAY RESULTS AS SHORT LIST

$("#search-recipe-btn").on("click", function(event) {
    event.preventDefault();

    axios.get("https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=ac075615bb0947ea8541206866406e74&sort=popularity&query=" + $("#recipe-search-input").val() + "&includeIngredients=" + $("#ingredient-search-input").val())
    .then((response) => {
        console.log(response);

        // If some results were found, show them on the page
        if (response.data.results.length > 0) {
            $("#recipe-previews").empty();
            $("#recipe-display").empty();
            $("#error-message").empty();

            $("#recipe-previews").append($("<h5>").text("Results"));
            var ul = $("<ul>");
            $("#recipe-previews").append(ul);

            for (var i = 0; i < response.data.results.length; i++) {
                // Save recipe id that can be used to look up more details
                ul.append($("<li class=\"recipe-preview-li\" data-id=\"" + response.data.results[i].id + "\">" + response.data.results[i].title + "</li>"));
            }

            $("#recipe-search-input").val("");
            $("#ingredient-search-input").val("");
        } else {
            // Display a message saying if there are no results
            $("#error-message").text("No results found matching the search criteria.")
        }
    })
})

// SHOW RECIPE DETAILS WHEN CLICKED ON RESULT
$(document).on("click", ".recipe-preview-li", function() {
    axios.get("https://api.spoonacular.com/recipes/" + $(this).attr("data-id") + "/information?apiKey=ac075615bb0947ea8541206866406e74")
    .then((response) => {
        console.log(response);

        console.log(response.data);

        displayRecipe(response.data);
    })
})
