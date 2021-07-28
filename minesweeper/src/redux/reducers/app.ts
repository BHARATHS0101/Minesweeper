import {Reducer} from 'redux';

const initialState: AppNS.IState = {
    isGameLost: false,
    isGameWon: false,
    gameGrid: [],
    finalGrid: [],
    selectedGameLevel: null,
    rows: 0,
    cols: 0,
    mines: 0,
};

const reducer:Reducer<
    AppNS.IState,
    AppNS.AllActions
> = (state = initialState, action) => {
    switch (action.type) {
        
        case 'APP_SET_INITIAL_GAME_GRID':
            return {
                ...state,
                gameGrid: action.payload.gameGrid,
                finalGrid: action.payload.finalGrid,
                rows: action.payload.rows,
                cols: action.payload.cols,
                mines: action.payload.mines,
            }   

        case 'APP_SET_SELECTED_DIFFICULTY_LEVEL':
            return {
                ...state,
                selectedGameLevel: action.payload.difficultyLevel,
            }

        case 'APP_SET_CLICKED_CELL':
            return {
                ...state,
                gameGrid: action.payload.gameGrid,
                finalGrid: action.payload.finalGrid,
                isGameLost: action.payload.isGameLost,
                isGameWon: action.payload.isGameWon,
            }
           
        case 'APP_CLEAR_STATE':
            return {
                ...initialState,
            }    

        default:
            return {
                ...state,
            }
    }
};

export default reducer;