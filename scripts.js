async function fetchData(endpoint) {
    try {
        const response = await fetch(`https://jotihunt.nl/api/2.0/${endpoint}`);
        const data = await response.json();
        document.getElementById(endpoint).innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
    }
}
