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

const DefaultLocations = {
	UpperDarby: {
		IP: "68.80.23.23",
		LAT: "39.94875654100655",
		LON: "-75.2588708144357",
		CC: "US",
		CITY: "Upper Darby",
		REGION: "Pennsylvania"
	},
	Morrisville: {
		IP: "69.253.59.255",
		LAT: "40.20935666922363",
		LON: "-74.79279438678957",
		CC: "US",
		CITY: "Morrisville",
		REGION: "Pennsylvania"
	},
	Null: null
}

const defaultLocation = DefaultLocations.Null