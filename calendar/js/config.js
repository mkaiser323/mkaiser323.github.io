const TimeProvider = {
    ISLAMIC_FINDER: "IslamicFinder",
    AL_ADHAN: "AlAdhan"
}
const TIME_PROVIDER = TimeProvider.AL_ADHAN;

const AlAdhan = {
	AsrCalculation: {
		STANDARD: 0,
		HANAFI: 1
	},
	CalculationMethod: {
		ISNA: 2
	}
}
const AlAdhanAsrCalculation = AlAdhan.AsrCalculation.STANDARD;
const AlAdhanCalculationMethod = AlAdhan.CalculationMethod.ISNA;

const save = true;//verify usage
const MARK_TODAY = false;//TODO: enable marking of today and make it not show for print
const NIGHT_MODE = false;
const BLACK_AND_WHITE_BY_DEFAULT = false;

const SavedLocations = {
	Morrisville: {
		IP: "69.253.59.255",
		LAT: "40.20935666922363",
		LON: "-74.79279438678957",
		CC: "US",
		CITY: "Morrisville",
		REGION: "Pennsylvania"
	},
	Bronx: {
		IP: "TODO",
		LAT: "40.88141434956781",
		LON: "-73.90444279257854",
		CC: "US",
		CITY: "Bronx",
		REGION: "New York"
	},
	Lansdale: {
		IP: "73.81.31.194",
		LAT: "40.24972619541977",
		LON: "-75.26949821576011",
		CC: "US",
		CITY: "Lansdale",
		REGION: "Pennsylvania"
	},
	Danbury: {
		IP: "TODO",
		LAT: "41.42976345040008",
		LON: "-73.42440749072004",
		CC: "US",
		CITY: "Danbury",
		REGION: "Connecticut"
	},	
	UpperDarby: {
		IP: "68.80.23.23",
		LAT: "39.94875654100655",
		LON: "-75.2588708144357",
		CC: "US",
		CITY: "Upper Darby",
		REGION: "Pennsylvania"
	}
}

const defaultLocation = SavedLocations.Morrisville