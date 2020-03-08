    genderLookup.addEventListener("click", function(){
        

  let name = $("#inputName").val();
  console.log(name);
  
  $.ajax({
      method: "GET",
      url: "https://www.behindthename.com/api/lookup.json",
      dataType: "json",
      data: {
          "key": "fo524612915",
          "name" : name },
      success: function(result){
          console.log(result);
          if(result[0].gender == "f"){
              $(".jumbotron").css("border", "solid pink 5px");
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Female");
              console.log("Female");
          } else if(result[0].gender == "m"){
              $(".jumbotron").css("border", "solid blue 5px");
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Male");
              console.log("Male");
          } else {
              $(".jumbotron").css("border", "solid violet 5px");
              $("#nameBox").html("Name: " + result[0].name); 
              $("#genderBox").html("Gender: Either");
              console.log("MF")
          }
      }
  });
})