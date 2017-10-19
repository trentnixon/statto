import { combineReducers } from "redux";

import UI_DATA from "./UI";
import PLAYER from "./PlayerStats";
import FORMGUIDE from "./PlayerFormGuide";
import BATTING from "./PlayerLiveStats";
import BOWLING from "./PlayerBowling";
import WORLDRANKINGS from "./WorldRankings";
import ACHIEVEMENTS from "./Achievements";
import Career_By from "./Career_By";
import SCORECARD from "./scorecard";
import MYTEAMS from "./MyTeams";
const reducers = combineReducers({
		UI:UI_DATA,
		PLAYER:PLAYER,
		BATTING:BATTING,
		FORMGUIDE:FORMGUIDE,
		BOWLING:BOWLING,
		WORLDRANKINGS:WORLDRANKINGS,
		ACHIEVEMENTS:ACHIEVEMENTS,
		Career_By:Career_By,
		SCORECARD:SCORECARD,
		MYTEAMS:MYTEAMS
	})

export default reducers;