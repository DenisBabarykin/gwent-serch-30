var custom_decks = [
	{
		"title": "Серчиковые Королевства",
		"description": "Колода Серчиковых Королевств с акцентом на осадные орудия — стиль игры: осадные отряды, моральный подъем, тесная связь.",
		"leader": "nr_foltest_siegemaster",
		"faction": "realms",
		"cards": [
			["spe_horn", 2],
			["spe_decoy", 1],
			["spe_fog", 1],
			["spe_clear", 3],
			["spe_scorch", 1],
			["nr_stennis", 1],
			["nr_vandergrift", 1],
			["nr_kaedweni_siege_support_1", 2],
			["nr_catapult_1", 1],
			["nr_catapult_2", 1],
			["nr_henselt", 1],
			["nr_kaedweni_reinforcement", 1],
			["nr_reinforced_ballista_1", 1],
			["nr_reinforced_ballista_2", 1],
			["nr_reinforced_trebuchet_1", 1],
			["nr_reinforced_trebuchet_2", 1],
			["nr_banner_nurse", 1],
			["nr_ban_ard_tutor", 1],
			["nr_demavend", 1],
			["nr_kaedweni_knight", 1],
			["nr_dun_banner_heavy_cavalry_1", 1],
			["nr_odrin", 1],
			["nr_seltkirk", 1],
			["nr_kaedweni_sergeant", 1],
			["nr_keira", 1],
			["nr_sheala", 1]
		]
	},
	{
		"title": "Нильфченьчская Империя - Прокидывание врага",
		"description": "Колода Нильфгаардской Империи с акцентом на прокидывание врага (или друзей) — стиль игры: прокидывание, шпионские отряды, контроль.",
		"leader": "ne_emhyr_imperial",
		"faction": "nilfgaard",
		"cards": [
			["spe_rain", 2],
			["spe_horn", 2],
			["spe_clear", 2],
			["spe_scorch", 1],
			["ne_impera_brigade_1", 1],
			["ne_impera_brigade_2", 1],
			["ne_impera_brigade_3", 1],
			["ne_impera_brigade_4", 1],
			["ne_impera_brigade_5", 1],
			["ne_jan_calveit", 1],
			["ne_vattier", 1],
			["ne_letho", 1],
			["ne_bribery", 1],
			["ne_moorvran", 1],
			["ne_fringilla", 1],
			["ne_young_emissary_1", 4],
			["ne_cahir", 1],
			["ne_stefan", 1],
			["ne_usurper", 1],
			["ne_fake_ciri", 1],
			["ne_assire", 1],
			["ne_treason", 1],
			["ne_peter_saar_gwynleve", 1],
			["ne_xarthisius", 1],
			["ne_menno", 1],
			["ne_renuald", 1]
		]
	}
];

var premade_deck = custom_decks;

var deckWeightConsts = {
	"spyBase": 20,
	"heroMult": 2,
	"musterMult": 2,
	"tightBondMult": 2,
	"medic": 7,
	"scorch": 5,
	"scorch_c": 5,
	"morale": 5,
	"agile": 2,
	"horn": 10,
	"berserker": 5,
	"mardroeme": 5,
	"avenger": 5,
	"decoy": 7,
	"clearWeatherWeight": 7,
	"heroSpyBase": 5,
	"cintra_slaughter": 5,
	"resilience": 5,
	"witcherSchoolWeight": 1,
	"witch_hunt": 5,
	"whorshipper": 2,
	"whorshipped": 2,
	"inspire": 3
};

function calcDeckWeight(deck) {
	var total = 0;
	deck.cards.forEach(entry => {
		let c = card_dict[entry[0]];
		let cnt = parseInt(entry[1]);
		let abi = c["ability"].split(" ");
		let cStr = 0;
		if (!c["deck"].startsWith("special") && !c["deck"].startsWith("weather")) {
			if (abi.includes("spy")) {
				cStr = deckWeightConsts["spyBase"] - parseInt(c["strength"]);
				if (abi.includes("hero")) cStr += deckWeightConsts["heroSpyBase"];
				if (c.row === "agile") cStr += deckWeightConsts["agile"];
			} else {
				cStr = parseInt(c["strength"]);
				if (abi.includes("hero")) cStr *= deckWeightConsts["heroMult"];
				if (abi.includes("bond")) cStr *= deckWeightConsts["tightBondMult"];
				if (abi.includes("muster")) cStr *= deckWeightConsts["musterMult"];
				abi.forEach(a => {
					if (a in deckWeightConsts) cStr += deckWeightConsts[a];
				});
				if (
					abi.includes("witcher_wolf_school") ||
					abi.includes("witcher_bear_school") ||
					abi.includes("witcher_viper_school") ||
					abi.includes("witcher_cat_school") ||
					abi.includes("witcher_griffin_school")
				) cStr += deckWeightConsts["witcherSchoolWeight"];
				if (c.row === "agile") cStr += deckWeightConsts["agile"];
			}
		}
		total += (cStr*cnt);
	});
	return total;
}