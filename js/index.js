import get from './getElement.js';
import { switchMode } from './darkMode.js';
import { data1, trends } from './data.js';

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
        <div class="tweet tweet-nav opt">
          <div class="tweet-img">
            <img src="${accountImage}" alt=${account} >
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
              <img src="${postImage}" alt="">
            </div>
            <ul class="flex-row">
              <li class="icon-btn">
              	<i class="far fa-comment comment"></i>
              	<span> ${comment}</span>
              </li>
              <li class="icon-btn">
              	<i class="fas fa-retweet retweet"></i>
              	<span> ${retweet}</span>
              </li>
              <li class="icon-btn">
              	<i class="far fa-heart likes"></i>
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
      const icon = element.firstElementChild;
      const span = element.lastElementChild;
      const parent =
        element.parentElement.parentElement.parentElement.parentElement;

      function increaseAmount() {
        span.innerHTML = parseInt(span.textContent) + 1;
      }

      // function decreaseAmount() {
      //   span.innerHTML = parseInt(span.textContent) - 1;
      // }

      // For commenting, retweeting & liking just once
      /*
      if (icon.classList.contains('retweet')) {
        const retweetChecker = parent.querySelector('.retweeted');
        if (retweetChecker == null) {
          icon.setAttribute('class', 'fas fa-retweet green retweeted retweet');
          span.setAttribute('class', 'green');
          increaseAmount();
        } else {
          icon.setAttribute('class', 'fas fa-retweet icon-btn retweet');
          span.setAttribute('class', 'black');
          decreaseAmount();
        }
      }

      if (icon.classList.contains('likes')) {
        const likeChecker = parent.querySelector('.liked');
        if (likeChecker == null) {
          icon.setAttribute('class', 'fas fa-heart red liked likes');
          span.setAttribute('class', 'red');
          increaseAmount();
        } else {
          icon.setAttribute('class', 'far fa-heart icon-btn likes');
          span.setAttribute('class', 'black');
          decreaseAmount();
        }
      }
      */

      // For commenting, retweeting & liking a post continously

      if (icon.classList.contains('comment')) {
        icon.classList.add('blue');
        span.setAttribute('class', 'blue');
        increaseAmount();
      }

      if (icon.classList.contains('retweet')) {
        icon.setAttribute('class', 'fas fa-retweet green retweeted retweet');
        span.setAttribute('class', 'green');
        increaseAmount();
      }

      if (icon.classList.contains('likes')) {
        icon.setAttribute('class', 'fas fa-heart red liked likes');
        span.setAttribute('class', 'red');
        increaseAmount();
      }
    });
  });
};

const tweetInputForm = document.querySelector('.submit');

tweetInputForm.addEventListener('click', () => {
  window.scrollTo(0, document.body.scrollHeight);
});

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

const getLocalStorageSwapStyle = () => {
  function swapStyleSheet(sheet) {
    document.createElement('id', 'swap').setAttribute('href', sheet);
    localStorage.setItem('swap', sheet);
  }
  let style = localStorage.getItem('swap');
  swapStyleSheet(style);
};

window.addEventListener('DOMContentLoaded', function () {
  switchMode(); // calling the darkMode switch function
  display(data1, tweetsContainer);
  displayTrends(trends, trendsContainer);
});

export { getLocalStorageSwapStyle };
