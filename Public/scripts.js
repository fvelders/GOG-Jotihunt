// API-logica voor het ophalen van data van Jotihunt
async function fetchData(endpoint) {
    try {
      const response = await fetch(`https://jotihunt.nl/api/2.0/${endpoint}`);
      const data = await response.json();
      displayData(endpoint, data.data);
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }
  }
  
  // Functie om API-data van Jotihunt weer te geven
  function displayData(endpoint, data) {
    const div = document.getElementById(endpoint);
    div.innerHTML = ''; // Leeg de div om nieuwe data weer te geven
  
    if (endpoint === 'articles') {
      displayArticles(data);
    } else if (endpoint === 'subscriptions') {
      displaySubscriptions(data);
    } else if (endpoint === 'areas') {
      displayAreas(data);
    }
  }
  
  // Functie om artikelen weer te geven
  function displayArticles(articles) {
    const articlesDiv = document.getElementById('articles');
    articlesDiv.innerHTML = ''; // Leeg de div om nieuwe artikelen weer te geven
  
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
  
  // Functie om deelnemende groepen weer te geven
  function displaySubscriptions(subscriptions) {
    const subscriptionsDiv = document.getElementById('subscriptions');
    subscriptionsDiv.innerHTML = ''; // Leeg de div om nieuwe data weer te geven
  
    subscriptions.forEach(subscription => {
      const subscriptionDiv = document.createElement('div');
      subscriptionDiv.className = 'subscription';
  
      const name = document.createElement('h2');
      name.innerText = subscription.name;
      subscriptionDiv.appendChild(name);
  
      subscriptionsDiv.appendChild(subscriptionDiv);
    });
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
      
        if (username === 'admin' && password === 'admin') {
          showPage('mainPage');
          fetchData('subscriptions');
          fetchData('areas');
          fetchData('articles');
        } else {
          alert('Onjuiste gebruikersnaam of wachtwoord');
        }
      });  

}

  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
  }
  // Functie om status van vossenteams weer te geven
  function displayAreas(areas) {
    const areasDiv = document.getElementById('areas');
    areasDiv.innerHTML = ''; // Leeg de div om nieuwe data weer te geven
  
    areas.forEach(area => {
      const areaDiv = document.createElement('div');
      areaDiv.className = 'area';
  
      const name = document.createElement('h2');
      name.innerText = area.name;
      areaDiv.appendChild(name);
  
      const status = document.createElement('p');
      status.innerText = `Status: ${area.status}`;
      areaDiv.appendChild(status);
  
      areasDiv.appendChild(areaDiv);
    });
  }
  
  // Voorbeeld API-aanroepen
  fetchData('subscriptions');
  fetchData('areas');
  fetchData('articles');
  