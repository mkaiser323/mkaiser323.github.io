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