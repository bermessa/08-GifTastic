$(document).ready(function() {

    //GLOBAL VARIABLES
    //======================

    var animal = ["butterfly", "cat", "dog", "hampster", "bird", "rabbit", "goldfish", "ferret", "turtle", "hedgehog", "goat", "monkey", "otter", "panda", "camel", "crab", "deer", "racoon", "shark", "unicorn", "owl", "panda", "penguin", "polar bear", "elephant", "frog", "lion"];


    //FUNCTIONS
    //======================

    function displayGif() {
        $(".gifDisplay").empty();

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gif + "&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var results = response.data;
            console.log(results);

            for (var j = 0; j < results.length; j++) {

                var gifDiv = $("<div>");
                var rating = results[j].rating;
                var p2 = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                var still = results[j].images.fixed_width_still.url;
                var animated = results[j].images.fixed_width.url;
                image.attr("src", still);
                image.attr("data-state", "still");
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.addClass("gifImage");

                gifDiv.prepend(image).css("margin-bottom", "20px");
                gifDiv.prepend(p2);

                $(".gifDisplay").prepend(gifDiv);
            }


            var p1 = $("<p>").text("Click the image to animate the GIF!").css("font-size", "20px").css("font-weight", "bold").css("color", "#e6e6e6").css("text-align", "center");

            $(".gifDisplay").prepend(p1);

        });

    }

    function renderButton() {
        $(".buttons").empty();

        for (var i = 0; i < animal.length; i++) {
            var add = $("<button type='button' class='btn btn-primary'>");
            add.addClass("animalButtons");
            add.attr("data-name", animal[i]);
            add.text("#" + animal[i]);
            $(".buttons").append(add);
        }
        $("#animal-input").val(" ");
    }



    //MAIN PROCESS
    //======================
    renderButton();

    $(document).on("click", ".animalButtons", displayGif);

    $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var formAdd = $("#animal-input").val().trim().toLowerCase();
        animal.push(formAdd);
        renderButton();
    });

    // Since these images are added dynamically, listen on the document
    $(document).on("click", ".gifImage", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animated"));
            $(this).attr("data-state", "animated");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


});
