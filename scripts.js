async function fetchData(endpoint) {
    try {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = `https://jotihunt.nl/api/2.0/${endpoint}`;
        const response = await fetch(proxyUrl + targetUrl);
        const data = await response.json();
        displayData(endpoint, data.data);
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
    }
}

function displayData(endpoint, data) {
    const div = document.getElementById(endpoint);
    div.innerHTML = ''; // Leeg de div om nieuwe data weer te geven

    if (endpoint === 'articles') {
        displayArticles(data);
    } else {
        div.innerText = JSON.stringify(data, null, 2);
    }
}

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

