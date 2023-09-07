import get from './getElement.js';

let tweetsContainer = get('.tweets-container');
let tweetInputForm = get('.post-input-form');
let postInput = get('.post-input');

const postTweet = () => {
  const createTweetElement = (tweet) => {
    const {
      accountImage,
      name,
      account,
      timestamp,
      text,
      comment,
      retweet,
      likes,
      views,
      share,
    } = tweet;

    return `
      <div class="tweet tweet-nav opt">
        <div class="tweet-img">
          <img src="${accountImage}" alt=${account} >
        </div>

        <div class="flex-column">
          <h4>
            ${name}
            <span>${account} &bullet; ${timestamp}</span>
          </h4>
          <i class="fas fa-ellipsis-h"></i>
          <p>
            ${text}
          </p>
          <ul class="flex-row">
            <li><i class="far fa-comment react"></i> ${comment}</li>
            <li><i class="fas fa-retweet react"></i> ${retweet}</li>
            <li><i class="far fa-heart react"></i> ${likes}</li>
            <li><i class="fas fa-chart-simple"></i> ${views}</li>
            <li><i class="fas fa-arrow-up-from-bracket react"></i>${share}</li>
          </ul>
        </div>
      </div>
    `;
  };

  const postCreatedTweet = (e) => {
    e.preventDefault();

    const tweet = {
      accountImage: './img/heisdera_400x400.jpg',
      name: 'Raphael Wisdom',
      account: '@Heisdera_Tech',
      timestamp: 'now',
      text: postInput.value,
      comment: '0',
      retweet: '0',
      likes: '0',
      views: '1',
      share: '',
    };

    if (tweet.text.length >= 1) {
      tweetsContainer.innerHTML += createTweetElement(tweet);
      tweetInputForm.reset();
    }

    tweetsContainer.scrollTop = tweetsContainer.scrollHeight;
  };

  tweetInputForm.addEventListener('submit', postCreatedTweet);
};

export default postTweet;
