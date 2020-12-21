function playSound (key) {
  switch (key) {
    case "w":
      let snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
    
    case "a":
      let tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "s":
      let tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "d":
      let tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "j":
      let tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    case "k":
      let kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    case "l":
      let crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    default:
      console.log(triggerInnerHTML);

  }
}

document.querySelectorAll(".drum").forEach(item => {
  item.addEventListener("click", function () {

    triggerInnerHTML = this.innerHTML;
    playSound(triggerInnerHTML);
    buttonAnimation(triggerInnerHTML);
    

  });
});

document.addEventListener("keydown", function(event) {
  playSound(event.key);
  buttonAnimation(event.key);
});

function buttonAnimation(key) {
  let button = document.querySelector(`.${key}`)
  
  button.classList.add("pressed");

  setTimeout(function () { 
    button.classList.remove("pressed");
  }, 100);
}