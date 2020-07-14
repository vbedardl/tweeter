$(document).ready(function() {
  $("textarea#tweet-text").on('keydown', function(){
    $('.counter').text(() => 140 - this.value.length)
    if(this.value.length>140){
      $('.counter').css('color','red')
    }
  })

  $('article').hover(
    function(){ $(this).find('.username').removeClass('hidden')},
    function(){ $(this).find('.username').addClass('hidden')}
  )

})

$(function(){
  $('#write-tweet').on('click', function(){
    if($('.new-tweet').is(':hidden')){
      $('.new-tweet').slideDown('slow')
    }else{
      $('.new-tweet').slideUp('slow')
    }
  })
})

$(document).ready(function(){
  var goUpBtn = '#goUp'
  $(window).scroll(function(){
		if ($(this).scrollTop() > 300) {
      $(goUpBtn).fadeIn();
      $('nav').fadeOut()
		} else {
      $(goUpBtn).fadeOut();
      $('nav').fadeIn()

		}
  });
  
  $(goUpBtn).on('click', function(){
    $('html, body').animate({scrollTop:0}, 500)
    $('.new-tweet').css('display', 'block')
    $('#tweet-text').focus()
  })
})


$(function() {
  $('#twitting').on('click', function (e) {
    e.preventDefault()
    var form = $('form')
    var formData = $(form).serialize()

    if(formData.length < 6){
        $('#error-message').text('Dude..com on, you need to write something')
        $('#error-message').css('display','block')  
        setTimeout(()=>{
          $('#error-message').css('display','none')  
        },3000)
    }else if(formData.length > 140){
      $('#error-message').text('That is Waaaaaayy to long. 140 remember?')
      $('#error-message').css('display','block')  
      setTimeout(()=>{
        $('#error-message').css('display','none')  
      },3000)
    }else{
    let url = $(form).attr('action')
    $.ajax(url, { method: 'POST', data: formData })
    .done(function (data) {
      $('#tweet-text').val('');
      loadTweets()
      console.log('Success: ', data);
    });
  }
  });
});

const loadTweets = function(){
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .done(function(data){
    renderTweets(data)
  })
}
loadTweets()
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function(tweet){
  const { user, content, created_at } = tweet
  const $tweet = `
    <article>
    <div class="header">
      <div>
        <img height="64px"src="${user.avatars}">
        <h6>${user.name}</h6>
      </div>
      <h5 class="username hidden">@${user.handle}</h5>
    </div>
    <div class="main">
      <h6>${escape(content.text)}</h6>
    </div>
    <div class="footer">
      <h6>${created_at}</h6>
      <div>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </div>
    </div>
    </article>`
  return $tweet
}

const renderTweets = function(tweets){
  let str = ''
  for(let tweet of tweets){
    const $tweet = createTweetElement(tweet) 
    str = $tweet + str
  }
  $('#tweet-container').html(str)
}