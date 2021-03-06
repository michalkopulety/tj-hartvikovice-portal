import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import {
  client
} from '../utils/fetch';
import {
  Sort,
  SortType
} from '../utils/query/index';

export const getPlayers = createAsyncThunk(
  "players/getPlayers",
  async () => {
    let response = await client("api/players", {
      sort: new Sort({
        sorts: [
          new Sort({
            property: "surname",
            type: SortType.ASCENDING
          }),
          new Sort({
            property: "firstname",
            type: SortType.ASCENDING
          })
        ]
      })
    });
    let playerIds = response.map(player => player._id);
    let players = response.reduce((acc, player) => {
      return {
        [player._id]: player,
        ...acc
      };
    }, {})
    return {
      playerIds,
      players
    };
  }
);

const counterSlice = createSlice({
  name: 'newTraining',
  initialState: {
    isFetching: true,
    players: {},
    absent: [],
    present: [],
    checked: [],
    place: "",
    weather: "",
    team: "A",
    date: new Date().getTime(),
    time: new Date().getTime()
  },
  reducers: {
    setPresent(state, action) {
      state.present = action.payload;
    },
    setAbsent(state, action) {
      state.absent = action.payload;
    },
    setChecked(state, action) {
      state.checked = action.payload;
    },
    setPlace(state, action) {
      state.place = action.payload;
    },
    setWeather(state, action) {
      state.weather = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setTeam(state, action) {
      state.team = action.payload;
    }
  },
  extraReducers: {
    [getPlayers.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.players = action.payload.players;
      state.absent = action.payload.playerIds;
      state.present = [];
    },
  },
})
export const {
  setPresent,
  setAbsent,
  setChecked,
  setPlace,
  setWeather,
  setDate,
  setTime,
  setTeam
} = counterSlice.actions;

export default counterSlice.reducer