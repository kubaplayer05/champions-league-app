import { crateGroupTeam } from './utils.js'

// set fetch configuration

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

// end of configuration

// functions section

const loadStandings = () => {
	fetch(`https://v3.football.api-sports.io/standings?league=2&season=${currentSeason}`, requestOptions)
		.then(response => response.json())
		.then(result => {
			// get all lists that are in container
			const groupList = document.querySelectorAll('.group-list')
			// get array with arrays that represent groups
			const standings = result.response[0].league.standings
			console.log(standings)

			// get data and render it for each list
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
}

const loadStatistics = () => {}

// end of functions section

// This is mobile section

const menuIcon = document.querySelector('.hamburger-menu')
const closeIcon = document.querySelector('.close-icon')
const mobileNavigation = document.querySelector('.mobile-navigation')

// add events on icons

menuIcon.addEventListener('click', () => {
	mobileNavigation.classList.remove('rotate')
})

closeIcon.addEventListener('click', () => {
	mobileNavigation.classList.add('rotate')
})

// end of mobile section

// get current localization on app and load proper function

const section = window.location.pathname

switch (section) {
	case '/index.html':
		loadStandings()
		break
	case '/statistics.html':
		break
}
