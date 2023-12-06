const gamesList = longText.split("\n");

const maxCubesPerColor = {
	red: 12,
	green: 13,
	blue: 14,
};
// const colorRegex = /(red|green|blue)/g;
const countCubesOfColor = (round, colorRegex) => {
	const cubes = round.match(colorRegex);
	// console.log({ cubes });
	const cubeCount = cubes?.[0] != null ? parseInt(cubes[0].match(/\d*/g)[0]) : 0;
	// console.log({ cubeCount });

	return cubeCount;
};
//for each game, split on the semicolon to get the rounds
const games = gamesList.map((game) => {
	let [gameId, roundString] = game.replace("Game ", "").split(": ");
	const rounds = roundString.split("; ");
	gameId = parseInt(gameId);
	return { gameId, rounds };
});

let validGamesIdCount = 0;
let powerOfAllCubes = 0;
games.forEach((game) => {
	let maxRedCubes = 0;
	let maxGreenCubes = 0;
	let maxBlueCubes = 0;

	// console.log({ game });
	let isGameValid = true;

	console.log(`Game ${game.gameId}:`);

	game.rounds.forEach((round) => {
		console.log({ round });
		const redCubes = countCubesOfColor(round, /\d* red/g);
		const greenCubes = countCubesOfColor(round, /\d* green/g);
		const blueCubes = countCubesOfColor(round, /\d* blue/g);

		if (redCubes > maxRedCubes) maxRedCubes = redCubes;
		if (greenCubes > maxGreenCubes) maxGreenCubes = greenCubes;
		if (blueCubes > maxBlueCubes) maxBlueCubes = blueCubes;
		// console.log(
		// 	`Red: ${redCubes}/${maxCubesPerColor.red}`,
		// 	`Green: ${greenCubes}/${maxCubesPerColor.green}`,
		// 	`Blue: ${blueCubes}/${maxCubesPerColor.blue}`,
		// );
		if (redCubes > maxCubesPerColor.red || greenCubes > maxCubesPerColor.green || blueCubes > maxCubesPerColor.blue) {
			isGameValid = false;
			return;
		}
	});

	console.log(
		{ maxRedCubes, maxGreenCubes, maxBlueCubes },
		"\n",
		`POWER: ${maxBlueCubes * maxGreenCubes * maxRedCubes}`,
	);
	powerOfAllCubes += maxBlueCubes * maxGreenCubes * maxRedCubes;

	if (isGameValid) validGamesIdCount += game.gameId;
	console.log(`Game ${game.gameId} is ${isGameValid ? "valid" : "invalid"}`);
});

console.log({ validGamesIdCount, powerOfAllCubes });

// console.log({ rounds });
