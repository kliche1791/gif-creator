//Initial Arrray of topics 
var movies = ["Harry Potter", "Avengers", "The Lord of The Rings", "The Lion King", "Avatar"];

function displayGifs(){
  console.log("FLAG ENTERS HERE");
  event.preventDefault();
  $("#resultGif").empty();

  //take the attr value of data-name
  var movieAttr = $(this).attr("data-name");

  //save the URL with the movie data 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +movieAttr +"&api_key=2MWjtWeLrP0xAhMpoP9HMrJoHdg5jaKd&limit=10";

  //ajax function to get the method object
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    //waiting for ajax response 
    .then(function(response) {

      //get the object data
      var results = response.data;
     
      // foor loop to show all the array object 
      for (var i = 0; i < results.length; i++) {
      
        var gifDiv = $("<div>");

        gifDiv.addClass("column");
        
        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var movieImage = $("<img>");

        movieImage.attr("src", results[i].images.original_still.url);

        movieImage.attr("data-still", results[i].images.original_still.url);

        movieImage.attr("data-animate", results[i].images.fixed_height.url);

        movieImage.attr("data-state", "still");

        movieImage.addClass("img-thumbnail");

        movieImage.addClass("imgsize");

        movieImage.addClass("gif-move");

        gifDiv.prepend(p);

        gifDiv.prepend(movieImage);


        $("#resultGif").prepend(gifDiv);
        
      }
    });
  }  
  
  function playGif(){

    console.log("DATA MOVE");

      var state = $(this).attr("data-state");

      if (state === "still"){

        $(this).attr("src",$(this).attr("data-animate"));

        $(this).attr("data-state","animate");

       } else if(state === "animate"){

         $(this).attr("src",$(this).attr("data-still"));
         
         $(this).attr("data-state","still");
       }

  }

function buttonMovies(){

  $("#btnG").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");

    // Adding a class
    a.addClass("movie");

    a.addClass("btn btn-success");

    a.addClass("btn-style");

    // Added a data-attribute
    a.attr("data-name", movies[i]);

    // Provided the initial button text
    a.text(movies[i]);

    // Added the button to the HTML
    $("#btnG").append(a);

    
  }
  console.log(movies);
}

    
$(document).ready(function() {
  //show the array button on div btnG

 $("#btnGif").on("click", function(event) {

      event.preventDefault();
  
      // This line grabs the input from the textbox
      var movie = $("#gifGe").val().trim();
  
      // The movie from the textbox is then added to our array
      movies.push(movie);
  
      // Calling renderButtons which handles the processing of our movie array
      buttonMovies();

      $("#gifGe").val("");
    });

    $(document).on("click", ".movie", displayGifs);

    $(document).on("click", ".gif-move", playGif);
       
    buttonMovies();   
 
    })

