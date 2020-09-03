# L.I.F.E.

For this project we were assigned to create a website using third party API's, server side API's, and some other css frameworks than bootstrap. In order to create this, our group started by creating forks off of the main repository that Sierra created. This allowed us to work seperately on our portions of the project, and then merge the different branches for the final project. We next planned what we wanted to implement on our website. Originally we wanted to  use emotional recognition for text and images so that we could tailor a website to the users mood. We ran into multiple issues with API's surrounding this idea, so we were forced to pivot to a different idea. We still wanted to work with the depressing mood surrounding quarantine, so we decided to provide a site where people could find things to do in the boring quarantine times. We would provide gaming options, movies and recipes if people wanted to cook. In order to do this we had to find different server side API's that would allow us to search for the items we wanted to make available to the users.

## Frontend Layout HTML & CSS - Alex

To begin I told myself that we should have a sleak display that was also simple. Experimenting with different ccs frameworks was a good experience because it allowed me to discover different methods to approach building a webpage and provided so many different tools to use in the process.

The intitial home page I created as just a plain page with input boxes for search and buttons. When we had gone for the facial recognition we spent hours researching and experimenting so the pivot gave us a lesson in adversity and perseverence. As things evolved we as a team would discuss needed functions for the page and how they would be implemented. It's very interesting how many ways there are to go about the same task. 

Very quickly into the process it became clear we would need several HTML/CSS/Script files. I enjoyed the process and it was nice taking pages we had all built separate and putting them together find cohesion. 

Once we had the main page finished it seemed like an easy segway into the other pages, however, like most things we were met with a few challenge which required some GoogleFu to get passed.

Materilaize.css threw us for a loop because we were unable to keep styling without losing input fields within our form tags. This created an obstacle where a new function was needed to dynamically modify the "select" tags to function when utilizing Materialize.css. 

Here's and example of the code snippet:

![](Readme%20Images/Codesnippet.png)

When coding in a carousel some issues were encountered where we needed to give the carousel a function with a "setTimeout" to tell the browser when to cycle through the images provided.

Here's an example of the code snippet:

![](Readme%20Images/Carouselsnippet.png)

## Movies & Games API's - Aidan

I started by creating the games page which would allow the users to search for games given different parameters. I allowed the users to input the year the game was released, the genre, the title, and the number of results to be outputted per page. I did this using the rawg.io games database. This database holds over 350,000 games, and allowed me to search for them using the different parameters. I used the Jquery ajax call for the query URL, which consisted of the different parameters I wanted to search by. An example search query is shown below:
```
https://api.rawg.io/api/games?&ordering=relevance&genre=Action&search=Mario+Kart&dates=1990-01-01,2020-01-01&page_size=40
```
I appended to this URL whenever something was added to the different inputs that I provided. In addition to this I added a previous and next button at the bottom of the page so that the user could go between the different pages of results. This was made available by the response.next and response.previous calls from rawg object. Once the results were outputted from the rawg database, I was able to create new DOM elements, and append them to the page with the relevant information. Alex did the CSS styling for the page, and with that we had a working database of games for the bored, during quarantine. Here is a short gif of the final product:

![](Readme%20Images/games.gif)

In addtion to the usual search that is included on this page, I also added a random search function. This allowed the user to input parameters, and search for a random game on the database, if they just want to see what luck had to offer. 

The second page that I created was the movies page. This page was very similar to the games page in that there were different search parameters that would allow the user to search for a movie that would fit their preference. In order to do this I had to use the moviedb API. This had many different parameters for the query URL that allowed me to search for movies, but I could not search by title. To search by title I had to use the omdb API. I could not incorporate the two, so I just created two seperate search queries, where to user could search by title, or by genre year, and a few other selections. I had to do the next and previous buttons differently, because of the differences in the query call. For this API I had to append a new parameter that included what page I was on, so I did this whenever the next or previous buttons were clicked. Here is another gif of the website working:

![](Readme%20Images/movies.gif)

## Recipe API - Sierra

I used the Spoonacular API to get recipes to display on the recipe page. I chose to use the search methods that I thought would be most relevant to a person who was looking to pass time while following stay-at-home orders. The user can search using a keyword if they have a sense of want to make and/or list ingredients that they have at home that they want to use, or they can view a random recipe in case they have no idea what to make. 

The random recipe API response included all the information that I wanted to display, namely the title, image, ingredient list, instructions list, and source URL, but the search API that was used for the keyword and ingredient list search did not provide the full details about each recipe. Because of this, a third type of API call was made to retrieve the full recipe data when the user selects a recipe from the results list.

To retrieve information about a particular recipe from Spoonacular, it is necessary to provide the ID number of the recipe that is saved in the Spoonacular database. I used a `data-` attribute on the list items when displaying search results to keep track of this ID number, as shown in the code below.

```javascript
ul.append($("<li class=\"recipe-preview-li\" data-id=\"" + response.data.results[i].id + "\">" + response.data.results[i].title + "</li>"));
```

The HTML for the resulting list item for a single result might look something like this:

```html
<li class="recipe-preview-li" data-id="821302">Almond Joy Brownies</li>
```

Then, an event listener was added that would use the `data-id` attribute to retrieve and display the recipe data when the user clicked that recipe name, as shown below.

```javascript
$(document).on("click", ".recipe-preview-li", function() {
    axios.get("https://api.spoonacular.com/recipes/" + $(this).attr("data-id") + "/information?apiKey=[API-KEY]")
    .then((response) => {
        displayRecipe(response.data);
    })
})
```

The end result, as shown in the GIF below, is that the user can search for recipes, view a list of the 10 most popular results that match the search criteria, and click on the recipe names to view each recipe.

![demo of recipe search](Readme%20Images/recipes-demo.gif)

## Getting Started

To get this project running, one must copy the files from the class repository.

### Prerequisites

To have this project run, one must download VS Code off the appstore, and create a GitHub account. Git is also required to run this program, which can be downloaded 

```
$ brew install git. 
```
Homebrew can also be downloaded by inputting the following command in the terminal:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
The different API's that we used have different ways of use. For the rawg API there was no API key necessary for functionality. Anyone that looks up the documentation for the database will be able to use it. The moviedb API and the omdb API both required the user to make an account, and obtain an API key, but they were both free to use. 

### Installing

To install this project one must go through the GitHub website in order to clone this project. Clicking on the cone or download button and then copying the link that comes from that. One can then go into the Terminal application, and use the following command to copy the files:
`
git clone URL
`
This should then be moved to your desktop, or somewhere else on your computer. This will allow access to the html and css files. Opening the html file in a default browser will allow one to observe the website.

## Built With

* Basic building blocks
    * [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
    * [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
    * [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* Web APIs
    * [Rawg.io](https://api.rawg.io/docs/#operation/games_list)
    * [themoviedb](https://developers.themoviedb.org/3/discover/movie-discover)
    * [omdb](http://www.omdbapi.com/)
    * [Spoonacular](https://spoonacular.com/food-api)
* JavaScript libraries
    * [jQuery](https://jquery.com/)
    * [Axios](https://www.npmjs.com/package/axios)
* Styling packages
    * [Materialize.css](https://materializecss.com/)
    * [WOW.js](https://wowjs.uk/docs)
    * [Font Awesome](https://fontawesome.com/)


## Deployed Link

* [See Live Site](https://sierrachapman.github.io/life/)

## Authors

* Aidan Sweeny

- [Link to Github](https://github.com/AidanSweeny)
- [Link to LinkedIn](https://www.linkedin.com/in/aidan-sweeny-81075030/)

* Sierra Chapman

- [Link to Github](https://github.com/SierraChapman/)
- [Link to LinkedIn]()

* Alex Aguirrebena

- [Link to Github](https://github.com/Anotherarod/)
- [Link to LinkedIn]()

## License

This project is licensed under the MIT License 

## Acknowledgments

* UC Berkley Coding Bootcamp