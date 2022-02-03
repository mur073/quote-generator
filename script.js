const quoteBody = document.querySelector(".quote-body");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector(".quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let quoteList = [];

function loading() {
  loader.hidden = false;
  quoteBody.hidden = true;
}

function complete() {
  quoteBody.hidden = false;
  loader.hidden = true;
}

// Get a random quote from list
function newQuote() {
  loading();

  const quote = quoteList[Math.floor(Math.random() * quoteList.length)];

  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  complete();
}

// Get a list of quotes from API
async function getQuotes() {
  loading();

  try {
    const response = await fetch("https://type.fit/api/quotes");
    quoteList = await response.json();

    newQuote();
    complete();
  } catch (error) {}
}

// Share with quote on Twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
