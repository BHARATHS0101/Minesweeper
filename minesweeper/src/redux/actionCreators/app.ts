import actionTypes from '../actionTypes/app';
import _ from 'lodash';

class ActionCreators implements AppNS.IActionCreators {

    setInitialGameGrid: AppNS.IActionCreators['setInitialGameGrid'] = () => {
        return async(dispatch, getState) => {
            const {selectedGameLevel} = getState().App;
            let gameGrid:AppNS.IState['gameGrid'] = [];
            let finalGrid:AppNS.IState['finalGrid'] = [];
            let rows = 9;
            let cols = 9;
            let mines = 10;

            if(selectedGameLevel === 'Medium'){
                rows = 16;
                cols = 20;
                mines = 40;
            }else if(selectedGameLevel === 'Hard') {
                rows = 24;
                cols = 30;
                mines = 99;
            }

            for(let i = 0; i < rows; i++){
                gameGrid[i] = [];
                finalGrid[i] = [];
                for(let j = 0; j < cols; j++){
                    let cell:AppNS.ICell = {
                        isContainsBomb: false,
                        isOpen: false,
                        adjacentCellMines: 0,
                    };
                    let finalCell:AppNS.ICell = {
                        isContainsBomb: false,
                        isOpen: true,
                        adjacentCellMines: 0,
                    };
                    gameGrid[i].push(cell); 
                    finalGrid[i].push(finalCell);
                }
            }

            for(let i = 0; i < mines; i ++) {
                let randX = _.floor(_.random(0, rows-1))
                let randY = _.floor(_.random(0, cols-1))
                if(!gameGrid[randX][randY].isContainsBomb){
                    gameGrid[randX][randY].isContainsBomb = true;
                    finalGrid[randX][randY].isContainsBomb = true;
                    finalGrid[randX][randY].isOpen = false;
                }
            }

            dispatch({
                type: actionTypes.APP_SET_INITIAL_GAME_GRID,
                payload: {
                    gameGrid,
                    finalGrid,
                    rows,
                    cols,
                    mines,
                }
            });
        }
    }

    checkCellIsValid= (
        positionX:number, 
        positionY:number, 
        rows:number, 
        cols:number
    ) => {
        return ((positionX >= 0) && (positionX < rows) && (positionY >= 0) && (positionY < cols));
    }

    getAdjacentMinesCount = (
        positionX:number, 
        positionY:number, 
        gameGrid: AppNS.ICell[][],
        rows:number,
        cols:number
    ) => {
        let minesCount = 0;
        
        // north cell
        if(this.checkCellIsValid(positionX-1, positionY, rows, cols)){
            if(gameGrid[positionX-1][positionY].isContainsBomb){
                minesCount += 1;
            }
        }

        // south cell
        if(this.checkCellIsValid(positionX+1, positionY, rows, cols)){
            if(gameGrid[positionX+1][positionY].isContainsBomb){
                minesCount += 1;
            }
        }

        // east cell
        if(this.checkCellIsValid(positionX, positionY+1, rows, cols)){
            if(gameGrid[positionX][positionY+1].isContainsBomb){
                minesCount += 1;
            }
        }

        // west cell
        if(this.checkCellIsValid(positionX, positionY-1, rows, cols)){
            if(gameGrid[positionX][positionY-1].isContainsBomb){
                minesCount += 1;
            }
        }

        //northEast cell
        if(this.checkCellIsValid(positionX-1, positionY+1, rows, cols)){
            if(gameGrid[positionX-1][positionY+1].isContainsBomb){
                minesCount += 1;
            }
        }

        //northWest cell
        if(this.checkCellIsValid(positionX-1, positionY-1, rows, cols)){
            if(gameGrid[positionX-1][positionY-1].isContainsBomb){
                minesCount += 1;
            }
        }

        //southEast cell
        if(this.checkCellIsValid(positionX+1, positionY+1, rows, cols)){
            if(gameGrid[positionX+1][positionY+1].isContainsBomb){
                minesCount += 1;
            }
        }

        //southWest cell
        if(this.checkCellIsValid(positionX+1, positionY-1, rows, cols)){
            if(gameGrid[positionX+1][positionY-1].isContainsBomb){
                minesCount += 1;
            }
        }
        
        return minesCount;
    } 

    afterClickRecursiveFunction= (
        positionX:number, 
        positionY:number, 
        gameGrid: AppNS.ICell[][],
        finalGrid: AppNS.ICell[][],
        rows:number,
        cols:number        
    ) => {
        let minesCount = this.getAdjacentMinesCount(
            positionX,
            positionY,
            gameGrid,
            rows,
            cols,
        );
        gameGrid[positionX][positionY].adjacentCellMines = minesCount;
        gameGrid[positionX][positionY].isOpen = true;
        finalGrid[positionX][positionY].adjacentCellMines = minesCount;
        finalGrid[positionX][positionY].isOpen = true;
        if(minesCount !== 0){ 
            return {gameGrid, finalGrid};
        }else {
            // north cell
            if(this.checkCellIsValid(positionX-1, positionY, rows, cols)){
                if(!gameGrid[positionX-1][positionY].isContainsBomb && !gameGrid[positionX-1][positionY].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX-1,
                        positionY,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            // south cell
            if(this.checkCellIsValid(positionX+1, positionY, rows, cols)){
                if(!gameGrid[positionX+1][positionY].isContainsBomb && !gameGrid[positionX+1][positionY].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX+1,
                        positionY,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            // east cell
            if(this.checkCellIsValid(positionX, positionY+1, rows, cols)){
                if(!gameGrid[positionX][positionY+1].isContainsBomb && !gameGrid[positionX][positionY+1].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX,
                        positionY+1,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            // west cell
            if(this.checkCellIsValid(positionX, positionY-1, rows, cols)){
                if(!gameGrid[positionX][positionY-1].isContainsBomb && !gameGrid[positionX][positionY-1].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX,
                        positionY-1,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            //northEast cell
            if(this.checkCellIsValid(positionX-1, positionY+1, rows, cols)){
                if(!gameGrid[positionX-1][positionY+1].isContainsBomb && !gameGrid[positionX-1][positionY+1].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX-1,
                        positionY+1,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            //northWest cell
            if(this.checkCellIsValid(positionX-1, positionY-1, rows, cols)){
                if(!gameGrid[positionX-1][positionY-1].isContainsBomb && !gameGrid[positionX-1][positionY-1].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX-1,
                        positionY-1,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            //southEast cell
            if(this.checkCellIsValid(positionX+1, positionY+1, rows, cols)){
                if(!gameGrid[positionX+1][positionY+1].isContainsBomb && !gameGrid[positionX+1][positionY+1].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX+1,
                        positionY+1,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }

            //southWest cell
            if(this.checkCellIsValid(positionX+1, positionY-1, rows, cols)){
                if(!gameGrid[positionX+1][positionY-1].isContainsBomb && !gameGrid[positionX+1][positionY-1].isOpen){
                    this.afterClickRecursiveFunction(
                        positionX+1,
                        positionY-1,
                        gameGrid,
                        finalGrid,
                        rows,
                        cols
                    );
                }
            }
        }
    }

    setClickedCell: AppNS.IActionCreators['setClickedCell'] = (
        positionX,
        positionY,
    ) => {
        return async(dispatch, getState) => {
            const gameGrid = _.cloneDeep(getState().App.gameGrid);
            const finalGrid = _.cloneDeep(getState().App.finalGrid);
            const rows = getState().App.rows;
            const cols = getState().App.cols;

            if(gameGrid[positionX][positionY].isContainsBomb){
                dispatch({
                    type: actionTypes.APP_SET_CLICKED_CELL,
                    payload: {
                        gameGrid,
                        finalGrid,
                        isGameLost: true,
                        isGameWon: false,
                    }
                });
            }else {
                const updatedGameGrids = this.afterClickRecursiveFunction(
                    positionX,
                    positionY,
                    gameGrid,
                    finalGrid,
                    rows,
                    cols
                );
                const updatedGameGrid = updatedGameGrids?.gameGrid?updatedGameGrids.gameGrid:gameGrid;
                const updatedGameFinalGrid = updatedGameGrids?.finalGrid?updatedGameGrids.finalGrid:finalGrid;
                dispatch({
                    type: actionTypes.APP_SET_CLICKED_CELL,
                    payload: {
                        gameGrid,
                        finalGrid,
                        isGameLost: false,
                        isGameWon: _.isEqual(updatedGameGrid, updatedGameFinalGrid),
                    }
                });
            }
        }
    }

    setSelectedDifficultyLevel: AppNS.IActionCreators['setSelectedDifficultyLevel'] = (
        difficultyLevel
    ) => {
        return ({
            type: actionTypes.APP_SET_SELECTED_DIFFICULTY_LEVEL,
            payload: {
                difficultyLevel,
            }
        });
    }

    clearState: AppNS.IActionCreators['clearState'] = () => {
        return ({
            type: actionTypes.APP_CLEAR_STATE,
        })
    }

};

export default new ActionCreators();