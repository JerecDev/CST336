    $("#genderLookup").submit(function(e){
        
    $(".nameBox").empty();
    $(".genderBox").empty();


  let name = $("#inputName").val(); 
  
  $.ajax({
      method: "GET",
      url: "https://www.behindthename.com/api/lookup.json",
      dataType: "json",
      data: {
          "key": "za407011376",
          "name" : name },
      success: function(result){
          
          if(result[0].gender == "m"){
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Female");
              $(".jumbotron").css("border", "solid pink 7px");
              
          } else if(result[0].gender == "f"){
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Male");
              $(".jumbotron").css("border", "solid blue 7px");
              
          } else {
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Neutral Gender");
              $(".jumbotron").css("border", "solid gray 7px");
          }
      }
  });
})