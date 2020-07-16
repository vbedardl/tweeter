//Chrono function to convert the unix timestamp into a human readable version
export const chrono = function(number) {
  let result = '';
  if (number / (60 * 60 * 24 * 356 * 1000) >= 1) {
    result = `${Math.floor(number / (60 * 60 * 24 * 365 * 1000))} years ago`;
  } else if (number / (60 * 60 * 24 * 30 * 1000) >= 1) {
    result = `${Math.floor(number / (60 * 60 * 24 * 30 * 1000))} months ago`;
  } else if (number / (60 * 60 * 24 * 30 * 1000) >= 1) {
    result = `${Math.floor(number / (60 * 60 * 24 * 1000))} days ago`;
  } else if (number / (60 * 60 * 1000) >= 1) {
    result = `${Math.floor(number / (60 * 60 * 1000))} hours ago`;
  } else if (number / (60 * 1000) >= 1) {
    result = `${Math.floor(number / (60 * 1000))} minutes ago`;
  } else {
    result = `few seconds ago`;
  }
  return result;
};

//Protecting app from user inputs
export const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Composer character counter function
export const charCounter = function(){
  $('.counter').text(() => 140 - this.value.length);
  if (this.value.length > 140) {
    $('.counter').css('color','red');
  } else {
    $('.counter').css('color','black');
  }
}

//Change the title name to the user that just posted
export const changeName = function(name) {
  $('#nameTitle').text(name);
};

//Going to the tweet form and focussing on it
export const goToForm = function(){
  $('html, body').animate({scrollTop:0}, 500);
  $('.new-tweet').css('display', 'block');
  $('#tweet-text').focus();
}

//Fading out and in the button and the nav when scrolling
export const scrollFade = function(){
  if ($(window).scrollTop() > 300) {
    $('#goUp').fadeIn();
    $('nav').fadeOut();
  } else {
    $('#goUp').fadeOut();
    $('nav').fadeIn();
  }
}

//Removing the hiddenClass
export const removeHiddenClass = function(elm){
  $(elm).removeClass('hidden');
}

//Adding the HiddenClass
export const addHiddenClass = function(elm){
  $(elm).addClass('hidden')
}