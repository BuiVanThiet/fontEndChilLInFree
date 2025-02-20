// const initSate = {
//     active_card_order: false,
//     atTribute_type: 1
// }
// const rootReducer = (state = initSate, action) => {
//     switch (action.type) {
//         case 'OPEN_CARD_ORDER':
//             return {
//                 ...state, active_card_order: true
//             };
//         case 'CLONE_CARD_ORDER':
//             return {
//                 ...state, active_card_order: false
//             };
//         case 'CLICK_ATTIBUTE_TYPE':
//             return {
//                 ...state, active_card_order: action.payload
//             };
//         default:
//             // code block
//             return state;
//     }
// }

// export default rootReducer;


// src/redux/colorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    active_card_order: false,
    atTribute_type: 1,
    spinningSpin: false,
    percentSpin: 0
};

const RootReducer = createSlice({
    name: "root",
    initialState,
    reducers: {
        OPEN_CARD_ORDER: (state) => {
            state.active_card_order = true;
        },
        CLONE_CARD_ORDER: (state) => {
            state.active_card_order = false;
        },
        CLICK_ATTIBUTE_TYPE: (state, action) => {
            state.atTribute_type = action.payload;
        },
        START_LOADING: (state) => {
            state.spinningSpin = true;
            state.percentSpin = 0;
        },
        UPDATE_PROGRESS: (state, action) => {
            state.percentSpin = action.payload;
        },
        STOP_LOADING: (state) => {
            state.spinningSpin = false;
            state.percentSpin = 0;
        }
    }
});

// ✅ Export actions cho Redux Thunk
export const { OPEN_CARD_ORDER, CLONE_CARD_ORDER, CLICK_ATTIBUTE_TYPE, START_LOADING, UPDATE_PROGRESS, STOP_LOADING } = RootReducer.actions;

export const ACTION_LOAD_SPIN = () => (dispatch) => {
    dispatch(START_LOADING());

    let ptg = -10;
    const interval = setInterval(() => {
        ptg += 5;
        dispatch(UPDATE_PROGRESS(ptg));

        if (ptg > 100) {
            clearInterval(interval);
            dispatch(STOP_LOADING());
        }
    }, 100);
};
export default RootReducer.reducer;
