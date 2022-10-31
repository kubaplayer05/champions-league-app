import * as utils from './utils.js'

// set fetch configuration

const API_KEY = '7d1c90cee2546c046d41ff171199d7ee'
const currentSeason = 2022

const leagueId = 2 // 2 - Champions league

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

// standings

const loadStandings = () => {
	fetch(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${currentSeason}`, requestOptions)
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
					list.append(utils.crateGroupTeam(el))
				})
			})
		})
		.catch(error => console.log('error', error))
}

// statistics

const loadStatistics = () => {
	loadTopSoccers()
	loadTopAssisters()
	loadYellowCards()
	loadRedCards()
}

const loadTopSoccers = () => {
	fetch(
		`https://v3.football.api-sports.io/players/topscorers?season=${currentSeason}&league=${leagueId}`,
		requestOptions
	)
		.then(response => response.json())
		.then(result => {
			const goalList = document.querySelector('.goals-list')

			const playersList = result.response.map((player, index) => {
				return {
					name: player.player.name,
					photoURL: player.player.photo,
					count: player.statistics[0].goals.total,
					games: player.statistics[0].games.appearences,
					logo: player.statistics[0].team.logo,
					position: index + 1,
				}
			})

			playersList.forEach(player => {
				goalList.append(utils.createPlayerList(player))
			})
		})
		.catch(err => {
			console.log(err)
		})
}

const loadTopAssisters = () => {
	fetch(
		`https://v3.football.api-sports.io/players/topassists?season=${currentSeason}&league=${leagueId}`,
		requestOptions
	)
		.then(response => response.json())
		.then(result => {
			const assistsList = document.querySelector('.assists-list')

			const playersList = result.response.map((player, index) => {
				return {
					name: player.player.name,
					photoURL: player.player.photo,
					count: player.statistics[0].goals.assists,
					games: player.statistics[0].games.appearences,
					logo: player.statistics[0].team.logo,
					position: index + 1,
				}
			})

			playersList.forEach(player => {
				assistsList.append(utils.createPlayerList(player))
			})
		})
		.catch(err => {
			console.log(err)
		})
}

const loadYellowCards = () => {
	fetch(
		`https://v3.football.api-sports.io/players/topyellowcards?season=${currentSeason}&league=${leagueId}`,
		requestOptions
	)
		.then(response => response.json())
		.then(result => {
			const yellowCardsList = document.querySelector('.yellow-cards-list')

			const playersList = result.response.map((player, index) => {
				return {
					name: player.player.name,
					photoURL: player.player.photo,
					count: player.statistics[0].cards.yellow,
					games: player.statistics[0].games.appearences,
					logo: player.statistics[0].team.logo,
					position: index + 1,
				}
			})

			playersList.forEach(player => {
				yellowCardsList.append(utils.createPlayerList(player))
			})
		})
		.catch(err => {
			console.log(err)
		})
}

const loadRedCards = () => {
	fetch(
		`https://v3.football.api-sports.io/players/topredcards?season=${currentSeason}&league=${leagueId}`,
		requestOptions
	)
		.then(response => response.json())
		.then(result => {
			const redCardsList = document.querySelector('.red-cards-list')

			const playersList = result.response.map((player, index) => {
				return {
					name: player.player.name,
					photoURL: player.player.photo,
					count: player.statistics[0].cards.red,
					games: player.statistics[0].games.appearences,
					logo: player.statistics[0].team.logo,
					position: index + 1,
				}
			})

			playersList.forEach(player => {
				redCardsList.append(utils.createPlayerList(player))
			})
		})
		.catch(err => {
			console.log(err)
		})
}

// matches

const loadMatches = () => {}

// teams

const loadTeams = () => {}

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
	case '/standings.html':
		loadStandings()
		break
	case '/statistics.html':
		loadStatistics()
		utils.statisticList()
		break
	case '/matches.html':
		loadMatches()
		break
	case '/teams.html':
		loadTeams()
		break
}
