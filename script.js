const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quotes = [];
const QUOTE_SOURCE = "LOCAL";

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function insertQuote(quote){
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

function newQuote() {
    showLoadingSpinner();
    const quote = quotes[Math.floor(Math.random()*quotes.length)];
    insertQuote(quote);
}

async function getQuotes() {
    showLoadingSpinner();

    try {
        if (QUOTE_SOURCE === 'LOCAL') {
            quotes = (await import('./quotes.js')).localQuotes
        } else {
            const apiUrl = 'https://type.fit/api/quotes';
            const response = await fetch(apiUrl);
            quotes = await response.json();
        }
        newQuote();
    } catch(error) {
        console.log(error.message);
        removeLoadingSpinner();
    }
}

// Eventlisteners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes()
