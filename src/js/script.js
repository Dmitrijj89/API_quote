const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const vkBtn = document.getElementById('vk');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function loadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function removeSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get api quote
async function getQuote() {
    loadingSpinner();
    const proxyUrl = "https://quote-pages-cors.herokuapp.com/";
    const urlApi = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json";
    try {
        const response = await fetch(proxyUrl + urlApi);
        const data = await response.json();
        console.log(data);
        //if author unknown
        if(data.quoteAuthor === "") {
            authorText.innerHTML = "Народная мудрость...";
        }else{
            authorText.innerHTML = data.quoteAuthor;
        }
        //if reduce font size long
        if(data.quoteText.length > 120 && document.documentElement.clientWidth > 400) {
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
       
        quoteText.innerHTML = data.quoteText;
        removeSpinner();
        //throw new Error('Ой, что-то пошло не так...')
    } catch (e) {
       //getQuote();
       console.log('Что-то пошло не так ', e); 
       quoteText.innerHTML = 'Ой, что-то пошло не так...';
       removeSpinner();
    }
}

//event quote
newQuoteBtn.addEventListener('click', getQuote);

getQuote();