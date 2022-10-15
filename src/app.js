const API_KEY = '7d1c90cee2546c046d41ff171199d7ee'
const currentSeason = 2022

const myHeaders = new Headers()
myHeaders.append('x-rapidapi-key', API_KEY)
myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io')

const requestOptions = {
	method: 'GET',
	headers: myHeaders,
	redirect: 'follow',
}

fetch(`https://v3.football.api-sports.io/standings?league=2&season=${currentSeason}`, requestOptions)
	.then(response => response.json())
	.then(result => {
		const standings = result.response[0].league.standings
		console.log(standings)
	})
	.catch(error => console.log('error', error))
