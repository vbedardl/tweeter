import { chrono, escape, changeName } from "./helper-functions.js"

//Creating the DOM elements for each tweets
export const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;
  const $tweet = `
    <article>
    <header>
      <div>
        <img height="64px"src="${user.avatars}">
        <h6>${user.name}</h6>
      </div>
      <h5 class="username hidden">${user.handle}</h5>
    </header>
    <main>
      <h6>${escape(content.text)}</h6>
    </main>
    <footer>
      <h6>${chrono(Date.now() - Number(created_at))}</h6>
      <div>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </footer>
    </article>`;
  return $tweet;
};

// Rendering the created element in the html file
export const renderTweets = function(tweets) {
  let str = '';
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    str = $tweet + str;
  }
  $('#tweet-container').html(str);
};


//Showing/Hide the tweet Form
export const showTweetForm = function(){
  if ($('.new-tweet').is(':hidden')) {
    $('.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
  } else {
    $('.new-tweet').slideUp('slow');
  }
}

//Loading tweet function that makes a GET ajax request
export const loadTweets = function() {
  $.ajax('/tweets', { method: 'GET' })
    .done(function(data) {
      changeName(data[data.length - 1].user.name);
      renderTweets(data);
    });
};