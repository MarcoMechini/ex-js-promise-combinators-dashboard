// https://boolean-spec-frontend.vercel.app/freetestapi

const apiUrl = 'https://boolean-spec-frontend.vercel.app/freetestapi'

async function getDashboardData(query) {
    const promise1 = fetchJson(`${apiUrl}/destinations?search=${query}`)
    const promise2 = fetchJson(`${apiUrl}/weathers?search=${query}`)
    const promise3 = fetchJson(`${apiUrl}/airports?search=${query}`)

    return Promise.all([promise1, promise2, promise3])
        .then(obj => {
            let town = {};
            obj.forEach(elem => {
                town = { ...town, ...elem[0] }
            });
            return town
        }
        )

}

async function fetchJson(url) {
    const resp = await fetch(url)
    const obj = await resp.json()
    return obj;
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather_description
            }.\n` +
            `The main airport is ${data.name}.\n`
        );
    })
    .catch(error => console.error(error));