$("button").on("click", function() {
  $("h1").css("color", "yellow" );
  $("h1").slideToggle();
})

$(document).keypress(function(event) {
  $("h1").text(event.key);
})

$("h1").on("mouseover", function() {
  $("h1").css("color","rebeccapurple");
})