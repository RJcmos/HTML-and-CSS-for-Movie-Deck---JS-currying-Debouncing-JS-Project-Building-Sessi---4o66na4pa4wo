
// API Key - Replace 'YOUR_API_KEY' with your actual API key
const apiKey = '2ULLRZ37RYB2LP7M';

// Function to fetch stock data from the API
async function fetchStockData(symbol, timeframe) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeframe}&symbol=${symbol}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock data:', error);
    }
}

// Function to add a stock to the watchlist
function addStockToWatchlist(symbol, timeframe) {
    const watchlist = document.getElementById('watchlist');
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    card.addEventListener('click', () => openModal(symbol, timeframe));
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        card.remove();
    });
    
    card.appendChild(deleteButton);
    watchlist.appendChild(card);
}

// Function to open the modal and display stock data
async function openModal(symbol, timeframe) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    const closeContainer = document.createElement('div');
    closeContainer.classList.add('modal-close');
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modalContent.remove();
    });
    
    closeContainer.appendChild(closeButton);
    modalContent.appendChild(closeContainer);
    
    const stockData = await fetchStockData(symbol, timeframe);
    // Process and display the stock data in the modal
    
    modal.appendChild(modalContent);
}

// Event listener for the add button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
    const symbolInput = document.getElementById('symbol-input');
    const symbol = symbolInput.value.toUpperCase();
    
    const selectedTimeframeButton = document.querySelector('.timeframe-button.selected');
    const timeframe = selectedTimeframeButton.dataset.timeframe;
    
    addStockToWatchlist(symbol, timeframe);
    symbolInput.value = '';
});

// Event listener for the timeframe buttons
const timeframeButtons = document.querySelectorAll('.timeframe-button');
timeframeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        timeframeButtons.forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
    });
});
