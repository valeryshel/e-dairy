const quoteElement = document.getElementById('quote');

  async function fetchQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Ошибка при получении цитаты:', error.message);
      return 'Не удалось получить цитату';
    }
  }

  async function displayQuote() {
    const quote = await fetchQuote();
    quoteElement.textContent = quote;
  }

  displayQuote();

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('quoteOfTheDay');
    container.style.opacity = '1';
  });
