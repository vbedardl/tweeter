import { showTweetForm, loadTweets } from "./tweet-helpers.js"
import { charCounter, scrollFade, goToForm, removeHiddenClass, addHiddenClass } from './helper-functions.js'

$(document).ready(function() { 
  $("textarea#tweet-text").on('keyup', charCounter)
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
    const form = $('form');
    const formData = $(form).serialize();
    const tweetLength = $("textarea#tweet-text").val().length
    if (!$("textarea#tweet-text").val()) {
      $('#error-message').text('Please write something to submit your tweet');
      $('#error-message').css('display','block');
      setTimeout(()=>{
        $('#error-message').css('display','none');
      },3000);
    } else if (tweetLength > 140) {
      $('#error-message').text('Please do not use more than 140 characters');
      $('#error-message').css('display','block');
      setTimeout(()=>{
        $('#error-message').css('display','none');
      },3000);
    } else {
      const url = $(form).attr('action');
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