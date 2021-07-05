const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const copyBtn = document.getElementById('copy');
const newQuoteBtn = document.getElementById('new-quote');
const searchQuoteBtn = document.getElementById('search-quote');
const searchAuthorBtn = document.getElementById('search-author');
const copyTooltip = document.getElementById("copy-tooltip");
const loader = document.getElementById("loader");

// Show loading animation
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading animation
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

// Show new quote
function newQuote() {
    loading();
    // Choose random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Display quote text
    quoteText.textContent = quote.text;
    
    // Check if author field is blank and replace it with 'unknown'
   
    if (!quote.author || quote.author === null) {
        authorText.textContent = "Author Unknown";
        searchAuthorBtn.style.visibility = "hidden";
        
    } else {
        quoteText.textContent = quote.text;
        authorText.textContent = quote.author;
        console.log(quote);
    }

    // Check quote length to determine styling
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    complete();
}

// Get quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        // console.log(apiQuotes);

    } catch (error) {
        // Error handling

    }
}

// Search quote or author

function googleSearch(BtnID) {
    if (BtnID === searchAuthorBtn) {
        window.open(`https://google.com/search?q=${authorText.textContent}`, '_blank');
    } else {
        window.open(`https://google.com/search?q=${quoteText.textContent}`, '_blank');
    }
}

// Tweet quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Copy quote to clipboard
function copyQuote() {
    const copiedQuote = `${quoteText.textContent} - ${authorText.textContent}`;
    
    navigator.clipboard.writeText(copiedQuote).then(function() {
      console.log("clipboard successfully set");
      copyTooltip.innerHTML = "Copied: " + copiedQuote;
  }, function() {
        console.log("clipboard write failed");
        copyTooltip.innerHTML = "Failed to copy";
      return 0;
  });
        
}

// Mouse-out tooltip
function outFunc() {
    copyTooltip.innerHTML = "Copy to clipboard";
}

// On page load
getQuotes();

// Event Listeners
searchAuthorBtn.addEventListener('click', function () {
    googleSearch(searchAuthorBtn)
});

searchQuoteBtn.addEventListener('click', function () {
    googleSearch(searchQuoteBtn)
});

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyQuote);