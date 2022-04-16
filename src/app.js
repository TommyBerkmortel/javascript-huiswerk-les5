import axios from 'axios';

/*

    Je gaat dit doen met behulp van de REST Counties API. De documentatie over de verschillende endpoints kun je hier vinden. Bekijk deze documentatie goed. Let op: we raden je aan om gebruik te maken van de endpoints uit versie 2 (versie 3 is nog niet zo betrouwbaar).

    Voor je begint
[v]    Het bestaande CSS- en JavaScript bestand zijn nog niet gekoppeld aan het HTML-bestand. Dit mag je zelf doen.
[]        Schrijf voor alle opdrachten eerst stap voor stap de psuedo-code uit. Begin dan pas met programmeren. Ik meen het.
[v]        NPM en Parcel zijn al geconfigureerd, maar je moet de bijbehorende dependencies nog wel installeren. De node_modules map wordt immers niet meegepusht naar GitHub. Omdat er een package.json aanwezig is in het bestand, kun je dit doen met het volgende (globale) commando:
          npm install
    Alle benodigde dependencies zijn nu binnengehaald! Als je de applicatie wil starten, doe je dat met het volgende commando:

[v]        npm run start
[v]    Tip: wanneer je gebruik gaat maken van Axios zul je dit nog wel los moeten installeren, want deze staat nog niet in de package.json.
            * https://www.npmjs.com/package/axios

        Randvoorwaarden
    Op basis van de informatie uit de REST Countries API, haal je data op over alle landen ter wereld en geef je deze in een lijst weer op de pagina;
    Bovenaan de pagina staat de afbeelding van een wereldkaart (zie de map assets);
    Voor ieder land geef je het volgende weer:
[]    De naam van het land
[]    De vlag van dat land
[]    De zin: Has a population of [amount] people
[]    De landen zijn gesorteert op populatie, van laag naar hoog;
[]    De land-namen moeten worden weergegeven in een kleur die overeenkomt met het continent waar het land in ligt. Tip: maak hier een aparte functie voor die een regio-naam verwacht en bepaalt welke kleur het land moet krijgen. Een land ligt meestal in één van de volgende vijf contintenten, maar uitzonderingen kunnen voorkomen:

[]    Africa: blauw
[]    Americas: groen
[]    Asia: rood
[]    Europe: geel
[]    Oceania: paars

    Stappenplan
    Let op: het is uitdagender om jouw eigen stappenplan te maken. Als je niet zo goed weet waar je moet beginnen, kun je onderstaand stappenplan gebruiken:

[v]  1. Installeer en importeer Axios;
            * https://www.npmjs.com/package/axios
[v]  2. Neem de documentatie van de REST Countries API goed door. Welk endpoint heb je nodig om informatie over alle landen op te halen?
            * https://restcountries.com/v2/all
[v]  3. Schrijf een asynchrone functie die, met behulp van Axios, een GET-request maakt naar het juiste endpoint. Log de response in de console en bestudeer de data goed: hoe is het opgebouwd?
[v]  4. Probeer eens om de naam van het allereerste land te loggen in de console, welk pad moet je hiervoor volgen?
[v]  5. Maak een <ul>-tag in de HTML die je als referentie kunt gebruiken in jouw JavaScript bestand;
[v]  6. Zorg ervoor dat de naam van het allereerste land wordt weergegeven als <li>-tag in het lijst-element op de pagina;
            * Injecteren met de map-methode
[v]  7. Zorg er nu ook voor dat de populatie (Has a population of [amount] people) daaronder wordt weergegeven;
[v]  8. Schrijf een aparte functie die één regio-naam verwacht, en op basis van deze regio de correcte kleur-naam als string teruggeeft. Gebruik deze, om de naam van het land in de juiste kleur weer te geven op de pagina. Tip: zorg ervoor dat je CSS-classes maakt voor alle regio-kleuren!
[v]  9. Breidt de <li>-tag uit met een <img>-tag om zo ook de url van de meegegeven vlag-afbeelding weer te kunnen geven;
[v]  10.Gebruik de map-methode om over de array met landen heen te mappen, en zo een <li>-element te maken voor álle landen;
[v]  11.Zorg er ten slotte voor dat je de response data eerst sorteert op populatie, van laag naar hoog, voor je eroverheen mapt om de landen op de pagina weer te geven.
        Bonusopdrachten

[v]    Lees paragraaf 8.2 op EdHub door en kijk hoe je dit kunt toepassen in deze opdracht;
[v]    Make it look nice! 😍
    */
const listToHtml = document.getElementById('countyList');
const errorMessage = document.getElementById('error');

async function fetchCountries() {
    try {
        // het request maken
        const result = await axios.get('https://restcountries.com/v2/all');
        const countries = result.data.sort((a, b) => {
            return a.population - b.population;
        })
        createList(countries);
        return countries;
    } catch (error) {
        // de errors afvangen
        console.error(error);

        // error communiceren in de UI
        console.log(error.response);
        if (error.response.status === 500) {
            errorMessage.textContent = "Er ging iets mis in de server";
        } else if (error.response.status === 404) {
            errorMessage.textContent = "Het verzoek is mislukt";
        }
    }
}


fetchCountries()

function createList(countries) {

    listToHtml.innerHTML = countries.map((country) => {
        return `
        <li> <img src="${country.flag}" width="30px"> <span class="${regionColor(country.region)}">${country.name}</span> <br>
        Has a population of ${country.population} people</li>
        `;
    })
}


function regionColor(countryRegion) {

    switch (countryRegion) {
        case 'Africa':
            return 'blue';
            break;
        case 'Americas':
            return 'green';
            break;
        case 'Asia':
            return 'red';
            break;
        case 'Europe':
            return 'yellow';
            break;
        case 'Oceania':
            return 'purple';
            break;
    }
}


