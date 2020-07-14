const createArticle = function(user){
  const article = `
<article>
<div class="header">
  <div>
    <img height="64px"src="https://i.imgur.com/73hZDYK.png">
    <h6>${user.name}</h6>
  </div>
  <h5 class="username hidden">@${user.username}</h5>
</div>
<div class="main">
  <h6>${user.message}</h6>
</div>
<div class="footer">
  <h6>${user.date}</h6>
  <div>
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
  </div>
</div>
</article>`
return article
}

const renderTweet = objects => {
  for(let object of objects){
    $('#tweet-container').append(createArticle(object))
  }
}