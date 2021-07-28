declare namespace AppNS {

    type GameLevel = 'Easy' | 'Medium' | 'Hard';

    interface ICell {
        isOpen: boolean;
        isContainsBomb: boolean;
        adjacentCellMines: number;
    }

    interface IState {
        isGameLost: boolean;
        isGameWon: boolean;
        gameGrid: ICell[][];
        finalGrid: ICell[][];
        selectedGameLevel: GameLevel | null;
        rows: number;
        cols: number;
        mines: number;
    }

    interface IActionTypes {
        APP_SET_INITIAL_GAME_GRID: 'APP_SET_INITIAL_GAME_GRID';
        APP_SET_SELECTED_DIFFICULTY_LEVEL: 'APP_SET_SELECTED_DIFFICULTY_LEVEL';
        APP_SET_CLICKED_CELL: 'APP_SET_CLICKED_CELL';
        APP_CLEAR_STATE: 'APP_CLEAR_STATE';
    }

    interface IATSetInitialGameGrid {
        type: IActionTypes['APP_SET_INITIAL_GAME_GRID'];
        payload: {
            gameGrid: ICell[][];
            finalGrid: ICell[][];
            rows: number;
            cols: number;
            mines: number;
        }
    }

    interface IATSetClickedCell {
        type: IActionTypes['APP_SET_CLICKED_CELL'];
        payload: {
            gameGrid: AppNS.ICell[][];
            finalGrid: AppNS.ICell[][];
            isGameWon: boolean;
            isGameLost: boolean;
        }
    }

    interface IATSetSelectedDifficultyLevel {
        type: IActionTypes['APP_SET_SELECTED_DIFFICULTY_LEVEL'];
        payload: {
            difficultyLevel: GameLevel | null;
        }
    }

    interface IATClearState {
        type: IActionTypes['APP_CLEAR_STATE'];
    }

    type AllActions =
        | IATSetInitialGameGrid
        | IATSetSelectedDifficultyLevel
        | IATSetClickedCell
        | IATClearState;

    interface IActionCreators {
        setInitialGameGrid: () => ReduxNS.IThunkFunction<AllActions>;
        setClickedCell: (
            positionX: number,
            positionY: number,
        ) => ReduxNS.IThunkFunction<AllActions>;
        setSelectedDifficultyLevel: (
            difficultyLevel: GameLevel | null,
        ) => IATSetSelectedDifficultyLevel;
        clearState: () => IATClearState;
    }

    interface ICommonPopUpProps {
        heading: string;
    }

    interface ICommonButtonProps {
        name: string;
        className: string;
        onClick: (...args:any) => void;
    }

    interface IGameGridProps {
        gameGrid: IState['gameGrid'];
        onClickCell: (...args:any) => void;
    }
}