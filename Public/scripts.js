document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      if (username === 'demo' && password === 'demo') {
          alert('Inloggen succesvol!');
          document.getElementById('loginPage').style.display = 'none';
          document.getElementById('mainPage').style.display = 'block';
          document.getElementById('mainMenu').style.display = 'block';

          fetchData('subscriptions');
          fetchData('areas');
          fetchData('articles');
      } else {
          alert('Inloggen mislukt. Probeer het opnieuw.');
      }
  });

  async function fetchData(endpoint) {
      try {
          const response = await fetch(`https://jotihunt.nl/api/2.0/${endpoint}`);
          const data = await response.json();
          displayData(endpoint, data.data);
      } catch (error) {
          console.error('Er is een fout opgetreden:', error);
      }
  }

  function displayData(endpoint, data) {
      const div = document.getElementById(endpoint);
      div.innerHTML = '';

      if (endpoint === 'articles') {
          displayArticles(data);
      } else if (endpoint === 'subscriptions') {
          displaySubscriptions(data);
      } else if (endpoint === 'areas') {
          displayAreas(data);
      }
  }

  function displayArticles(articles) {
      const articlesDiv = document.getElementById('articles');
      articlesDiv.innerHTML = '';

      articles.forEach(article => {
          const articleDiv = document.createElement('div');
          articleDiv.className = 'article';

          const title = document.createElement('h2');
          title.innerText = article.title;
          articleDiv.appendChild(title);

          const type = document.createElement('p');
          type.innerText = `Type: ${article.type}`;
          articleDiv.appendChild(type);

          const publishDate = document.createElement('p');
          publishDate.innerText = `Gepubliceerd op: ${new Date(article.publish_at).toLocaleString()}`;
          articleDiv.appendChild(publishDate);

          const message = document.createElement('div');
          message.innerHTML = article.message.content;
          articleDiv.appendChild(message);

          articlesDiv.appendChild(articleDiv);
      });
  }

  function displaySubscriptions(subscriptions) {
      // Uw code voor het weergeven van subscriptions
  }

  function displayAreas(areas) {
      // Uw code voor het weergeven van areas
  }

  function showPage(pageId) {
      const pages = document.querySelectorAll('.page');
      pages.forEach(page => page.style.display = 'none');
      document.getElementById(pageId).style.display = 'block';
  }
});
