export { crateGroupTeam, createPlayerList, statisticList }

const crateGroupTeam = team => {
	const li = document.createElement('li')
	const leftSide = document.createElement('div')
	const rightSide = document.createElement('div')
	const rank = document.createElement('span')
	const name = document.createElement('p')
	const gamesPlayed = document.createElement('span')
	const wins = document.createElement('span')
	const draws = document.createElement('span')
	const losses = document.createElement('span')
	const goalDiff = document.createElement('span')
	const points = document.createElement('span')
	const logo = document.createElement('img')

	li.classList.add('group-team')
	leftSide.classList.add('left-side')
	rightSide.classList.add('right-side')
	rank.classList.add('rank')
	name.classList.add('team-name')
	gamesPlayed.classList.add('games-played')
	wins.classList.add('wins')
	draws.classList.add('draws')
	losses.classList.add('losses')
	goalDiff.classList.add('goal-diff')
	points.classList.add('points')
	logo.classList.add('club-logo')

	rank.textContent = team.rank
	name.textContent = team.name
	gamesPlayed.textContent = team.gamesPlayed
	wins.textContent = team.wins
	draws.textContent = team.draws
	losses.textContent = team.losses
	goalDiff.textContent = team.goalDiff
	points.textContent = team.points
	logo.setAttribute('src', `${team.logo}`)

	name.append(logo)
	leftSide.append(rank, name)
	rightSide.append(gamesPlayed, wins, draws, losses, goalDiff, points)
	li.append(leftSide, rightSide)

	return li
}

const createPlayerList = player => {
	const li = document.createElement('li')
	const position = document.createElement('span')
	const photo = document.createElement('img')
	const name = document.createElement('p')
	const count = document.createElement('span')
	const logo = document.createElement('img')

	li.classList.add('statistic-element')
	position.classList.add('player-position')
	photo.classList.add('player-photo')
	name.classList.add('player-name')
	count.classList.add('player-count')
	logo.classList.add('club-logo')

	position.textContent = player.position
	photo.setAttribute('src', `${player.photoURL}`)
	name.textContent = player.name
	count.textContent = player.count
	logo.setAttribute('src', `${player.logo}`)

	li.append(position, photo, name, count, logo)

	return li
}

const statisticList = () => {
	const allStatisticLists = document.querySelectorAll('.statistic-list')
	const select = document.querySelector('.statistic-select')

	select.addEventListener('change', e => {
		const value = e.target.value

		allStatisticLists.forEach(list => {
			if (list.classList.contains(value)) {
				list.classList.remove('hidden')
			} else list.classList.add('hidden')
		})
	})
}
