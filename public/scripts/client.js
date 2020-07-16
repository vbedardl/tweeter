import { showTweetForm, loadTweets } from "./tweet-helpers.js"
import { charCounter, scrollFade, goToForm, removeHiddenClass, addHiddenClass } from './helper-functions.js'

$(document).ready(function() {
  $("textarea#tweet-text").on('keydown', charCounter)
//Display the button to go up the page once the user has scrolled a little.
  $(window).scroll(scrollFade);
//On click, bring the user back up with a focus on the "new-tweet" form
  $('#goUp').on('click',goToForm);
  $('article').hover(removeHiddenClass('.username'), addHiddenClass('.username'))
});

//Display the new-tweet form when clicking on the "Wrtie a new tweet" link
$(function() {
  $('#write-tweet').on('click', showTweetForm);
});


//When user click on the Tweet button, serializing the data, making sure the request is legit (not null and not over 140 char) sending the post ajax request to the server and loading the tweets to the page with a GET ajax request
$(function() {
  $('#twitting').on('click', function(e) {
    e.preventDefault()
    let form = $('form');
    let formData = $(form).serialize();

    if (formData.length < 6) {
      $('#error-message').text('Dude..com on, you need to write something');
      $('#error-message').css('display','block');
      setTimeout(()=>{
        $('#error-message').css('display','none');
      },3000);
    } else if (formData.length > 140) {
      $('#error-message').text('That is Waaaaaayy to long. 140 remember?');
      $('#error-message').css('display','block');
      setTimeout(()=>{
        $('#error-message').css('display','none');
      },3000);
    } else {
      let url = $(form).attr('action');
      $.ajax(url, { method: 'POST', data: formData })
        .done(function(data) {
          $('#tweet-text').val('');
          showTweetForm()
          loadTweets();
        });
    }
  });
});

loadTweets();