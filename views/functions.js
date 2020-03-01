var keywords = ["cars", "sports", "animals", "people", "places", "castles"];
let randomKeyword = Math.floor(Math.random() * 4);

let randIndex1 = Math.floor(Math.random() * 20);
let randIndex2 = Math.floor(Math.random() * 20);
let randIndex3 = Math.floor(Math.random() * 20);
let randIndex4 = Math.floor(Math.random() * 20);

$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "https://pixabay.com/api/",
        dataType: "json",
        data: { "key": "13951242-f031e44171b4cc55e1cbaabed", "q": keywords[randomKeyword], "orientation": $("#orientation").val() },
        success: function(result, status) {


            $("#first").attr('src', result.hits[randIndex1].previewURL);
            $("#second").attr('src', result.hits[randIndex2].previewURL);
            $("#third").attr('src', result.hits[randIndex3].previewURL);
            $("#fourth").attr('src', result.hits[randIndex4].previewURL);

            $("#pic1Likes").html(result.hits[randIndex1].likes);
            $("#pic2Likes").html(result.hits[randIndex2].likes);
            $("#pic3Likes").html(result.hits[randIndex3].likes);
            $("#pic4Likes").html(result.hits[randIndex4].likes);

        }

    });

    $("#imageSearch").submit(function(e) {
        e.preventDefault();

        $.ajax({
            method: "GET",
            url: "https://pixabay.com/api/",
            dataType: "json",
            data: { "key": "13951242-f031e44171b4cc55e1cbaabed", "q": $("#keyword").val(), "orientation": $("#orientation").val() },
            success: function(result, status) {
                let index1 = Math.floor(Math.random() * result.hits.length);
                let index2 = Math.floor(Math.random() * result.hits.length);
                let index3 = Math.floor(Math.random() * result.hits.length);
                let index4 = Math.floor(Math.random() * result.hits.length);

                $("#first").attr('src', result.hits[index1].previewURL);
                $("#second").attr('src', result.hits[index2].previewURL);
                $("#third").attr('src', result.hits[index3].previewURL);
                $("#fourth").attr('src', result.hits[index4].previewURL);

                $("#pic1Likes").html(result.hits[randIndex1].likes);
                $("#pic2Likes").html(result.hits[randIndex2].likes);
                $("#pic3Likes").html(result.hits[randIndex3].likes);
                $("#pic4Likes").html(result.hits[randIndex4].likes);
            }

        });
    });
});