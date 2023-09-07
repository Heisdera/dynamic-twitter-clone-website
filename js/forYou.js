import { data2, trends } from './data.js';
import get from './getElement.js';
import { getLocalStorageSwapStyle } from './index.js';

// import postTweet from './createTweet.js';
// postTweet();

const tweetsContainer = get('.tweets-container');
const trendsContainer = get('.trends-container');

const display = (data, element) => {
  element.innerHTML = data
    .map((details) => {
      const {
        name,
        accountImage,
        account,
        date,
        postArticle,
        postImage,
        comment,
        retweet,
        likes,
        views,
        share,
      } = details;

      return `
			<div class="tweet tweet-nav border">
        <div class="tweet-img">
          <img src="${accountImage}" >
        </div>
        
        <div class="flex-column">
          <h4>
            ${name} 
            <span>${account} &bullet; ${date}</span>
          </h4>
          <i class="fas fa-ellipsis-h"></i>
          <p>
          	${postArticle}
          </p>
          <div class="img">
            <img src= ${postImage} alt="">
          </div>
        <ul class="flex-row">
            <li>
            	<i class="far fa-comment comment icon-btn"></i>
            	<span> ${comment}</span>
            </li>
            <li>
            	<i class="fas fa-retweet retweet icon-btn"></i>
            	<span> ${retweet}</span>
            </li>
            <li>
            	<i class="far fa-heart likes icon-btn"></i>
            	<span> ${likes}</span>
            </li>
            <li>
            	<i class="fas fa-chart-simple"></i>
            	<span> ${views}</span>
            </li>
            <li>
            	<i class="fas fa-arrow-up-from-bracket react"></i>
            	<span> ${share}</span>
            </li>
          </ul>
          
        </div>
      </div>
		`;
    })
    .join('');

  const iconBtn = [...element.querySelectorAll('.icon-btn')];

  iconBtn.forEach((icon) => {
    icon.addEventListener('click', function (e) {
      const element = e.currentTarget;
      const parent =
        element.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      let span = element.nextElementSibling;

      function increaseAmount() {
        span.innerHTML = parseInt(span.textContent) + 1;
      }
      function decreaseAmount() {
        span.innerHTML = parseInt(span.textContent) - 1;
      }

      if (element.classList.contains('comment')) {
        element.classList.add('blue');
        span.setAttribute('class', 'blue');
        increaseAmount();
      }

      if (element.classList.contains('retweet')) {
        const retweetChecker = parent.querySelector('.retweeted');
        if (retweetChecker == null) {
          element.setAttribute(
            'class',
            'fas fa-retweet green retweeted retweet'
          );
          span.setAttribute('class', 'green');
          increaseAmount();
        } else {
          element.setAttribute('class', 'fas fa-retweet icon-btn retweet');
          span.setAttribute('class', 'black');
          decreaseAmount();
        }
      }

      if (element.classList.contains('likes')) {
        const likeChecker = parent.querySelector('.liked');
        if (likeChecker == null) {
          element.setAttribute('class', 'fas fa-heart red liked likes');
          span.setAttribute('class', 'red');
          increaseAmount();
        } else {
          element.setAttribute('class', 'far fa-heart icon-btn likes');
          span.setAttribute('class', 'black');
          decreaseAmount();
        }
      }
    });
  });
};

const displayTrends = (data, element) => {
  element.innerHTML = data
    .map((item) => {
      const { category, trend, tweets } = item;
      return `
			<li class="list">
        <span>${category}</span>
        <h4>${trend}</h4>
        <span>${tweets}</span>
        <i class="fas fa-ellipsis-h"></i>
      </li>
		`;
    })
    .join('');
};

window.addEventListener('DOMContentLoaded', function () {
  display(data2, tweetsContainer);
  displayTrends(trends, trendsContainer);
  getLocalStorageSwapStyle();
});
