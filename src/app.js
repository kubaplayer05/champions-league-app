import { crateGroupTeam } from './utils.js'

const API_KEY = '7d1c90cee2546c046d41ff171199d7ee'
const currentSeason = 2022

const groupList = document.querySelectorAll('.group-list')

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

		groupList.forEach(list => {
			const index = list.attributes[1].value
			const result = standings[index].map(team => {
				return {
					rank: team.rank,
					name: team.team.name,
					gamesPlayed: team.all.played,
					wins: team.all.win,
					draws: team.all.draw,
					losses: team.all.lose,
					goalDiff: team.goalsDiff,
					points: team.points,
					logo: team.team.logo,
				}
			})

			result.forEach(el => {
				list.append(crateGroupTeam(el))
			})
		})
	})
	.catch(error => console.log('error', error))
