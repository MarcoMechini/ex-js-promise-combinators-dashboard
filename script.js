// https://boolean-spec-frontend.vercel.app/freetestapi

const apiUrl = 'https://boolean-spec-frontend.vercel.app/freetestapi'

async function getDashboardData(query) {

    try {

        const promise1 = fetchJson(`${apiUrl}/destinations?search=${query}`)
        const promise2 = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
        const promise3 = fetchJson(`${apiUrl}/airports?search=${query}`)

        const promise = await Promise.allSettled([promise1, promise2, promise3])
            .then(obj => {
                let town;
                obj.forEach(elem => {
                    town = { ...town, ...elem.value[0] }
                });
                return town
            })

        return {
            city: promise?.city ?? null,
            country: promise?.country ?? null,
            temperature: promise?.temperature ?? null,
            weather: promise?.weather_description ?? null,
            airport: promise?.name ?? null,

        }
    } catch (error) {
        throw new Error('Errore recupero dati', error.message)
    }
}

async function fetchJson(url) {
    const resp = await fetch(url)
    const obj = await resp.json()
    return obj;
}

// getDashboardData('vienna')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));

(async () => {
    try {
        const data = await getDashboardData('vienna')
        console.log('Dasboard data:', data);
        let message = '';
        if (data.city && data.country) {
            message += `${data.city} is in ${data.country}.\n`;
        }
        if (data.temperature && data.weather) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        }
        if (data.airport) {
            message += `The main airport is ${data.airport}.\n`
        }
        console.log(message);
    } catch (error) {
        console.error(error);
    }
})()