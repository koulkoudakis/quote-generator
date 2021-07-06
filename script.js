const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const copyBtn = document.getElementById('copy');
const newQuoteBtn = document.getElementById('new-quote');
const prevQuoteBtn = document.getElementById('prev-quote');
const nextQuoteBtn = document.getElementById('next-quote');
const searchQuoteBtn = document.getElementById('search-quote');
const searchAuthorBtn = document.getElementById('search-author');
const copyTooltip = document.getElementById("copy-tooltip");
const loader = document.getElementById("loader");

let apiQuotes = [];
let quoteHistory = [];
let historyIndex = 0;

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

// Show new quote
function newQuote() {
    loading();
    // Choose random quote from apiQuotes array
    const index = Math.floor(Math.random() * apiQuotes.length)
    const quote = apiQuotes[index];
    
    // Store quote index in history
    quoteHistory.push(index);
    console.log(quoteHistory);
    historyIndex = quoteHistory.length - 1;
    
    
    if (quoteHistory.length > 1) {
        prevQuoteBtn.style.visibility = "visible";
    }
    nextQuoteBtn.style.visibility = "hidden";

    // Display quote text
    quoteText.textContent = quote.text;
    
    // Check if author field is blank and replace it with 'unknown'
   
    if (!quote.author || quote.author === null) {
        authorText.textContent = "Author Unknown";
        searchAuthorBtn.style.visibility = "hidden";
        
    } else {
        authorText.textContent = quote.author;
        searchAuthorBtn.style.visibility = "visible";
    }

    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    complete();
}

// Show previous quote in history
function prevQuote() {
    loading();

    // Check if at the first quote index generated
    if (historyIndex >= 1) {
        historyIndex -= 1;
        nextQuoteBtn.style.visibility = "visible";
    } else {
        prevQuoteBtn.style.visibility = "hidden";
    }
    const prevIndex = quoteHistory[historyIndex];
    console.log(prevIndex);
    const quote = apiQuotes[prevIndex];

    // Display quote text
    quoteText.textContent = quote.text;
    
    // Check if author field is blank and replace it with 'unknown'
   
    if (!quote.author || quote.author === null) {
        authorText.textContent = "Author Unknown";
        searchAuthorBtn.style.visibility = "hidden";
        
    } else {
        authorText.textContent = quote.author;
        searchAuthorBtn.style.visibility = "visible";
    }

    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    if (historyIndex === 0) {
        prevQuoteBtn.style.visibility = "hidden";
    }
    complete();
}

// Show next quote in history
function nextQuote() {
    loading();

    // Check if at the first quote index generated
    if (historyIndex <= quoteHistory.length - 1) {
        historyIndex += 1;
        prevQuoteBtn.style.visibility = "visible";
    } else {
        nextQuoteBtn.style.visibility = "hidden";
    }
    const nextIndex = quoteHistory[historyIndex];
    console.log(nextIndex);
    const quote = apiQuotes[nextIndex];

    // Display quote text
    quoteText.textContent = quote.text;
    
    // Check if author field is blank and replace it with 'unknown'
   
    if (!quote.author || quote.author === null) {
        authorText.textContent = "Author Unknown";
        searchAuthorBtn.style.visibility = "hidden";
        
    } else {
        authorText.textContent = quote.author;
        searchAuthorBtn.style.visibility = "visible";
    }

    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    if (historyIndex === quoteHistory.length - 1) {
        nextQuoteBtn.style.visibility = "hidden";
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
prevQuoteBtn.addEventListener('click', prevQuote);
nextQuoteBtn.addEventListener('click', nextQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyQuote);