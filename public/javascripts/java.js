
$("#genderLookup").submit(function(e){
    e.preventDefault();

  let name = $("#inputName").val();
  console.log(name);
  
  $.ajax({
      method: "GET",
      url: "https://www.behindthename.com/api/lookup.json",
      dataType: "json",
      data: {
          "key": "za407011376",
          "name" : name },
      success: function(result){

          if(result[0].gender == "f"){
              $(".jumbotron").css("border", "solid pink 5px");
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Female");
              $("#genderBox").css("background", "pink");
              $("#nameBox").css("background", "pink");

          } else if(result[0].gender == "m"){
              $(".jumbotron").css("border", "solid blue 5px");
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Male");
              $("#genderBox").css("background", "blue");
              $("#nameBox").css("background", "blue");

          } else {
              $(".jumbotron").css("border", "solid violet 5px");
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Neutral");
              $("#genderBox").css("background", "gray");
              $("#nameBox").css("background", "gray");


          }
      }
  });
})