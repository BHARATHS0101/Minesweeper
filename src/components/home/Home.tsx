import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import actionCreators from '../../redux/actionCreators/app'

import CommonPopUp from '../commonPopUp';
import CommonButton from '../commonButton';
import GameGrid from './GameGrid';

import './Home.css';


const Home = () => {

    const state:AppNS.IState = useSelector((
        appState: ReduxNS.IState
    ) => appState.App);

    const dispatch = useDispatch();

    const dispatchActionToSetDifficultyLevel = (difficultyLevel:AppNS.GameLevel | null) => {
        dispatch(actionCreators.setSelectedDifficultyLevel(difficultyLevel));
        dispatch(actionCreators.setInitialGameGrid());
    };

    const dispatchActionToSetClickedCell = (positionX:number, positionY:number) => {
        dispatch(actionCreators.setClickedCell(positionX, positionY))
    };

    const distpatchActionToClearState = () => {
        dispatch(actionCreators.clearState())
    }

    return (
        <div className={"mainContainer"}>
            {state.isGameLost ?
            <CommonPopUp heading={'Oops! stepped on mine....'}>
                <CommonButton
                    name={'Play Again'}
                    className={"playAgainButton"}
                    onClick={distpatchActionToClearState}
                />
            </CommonPopUp>
            :state.isGameWon ?
            <CommonPopUp heading={'Yay! won the game....'}>
                <CommonButton
                    name={'Play Again'}
                    className={"playAgainButton"}
                    onClick={distpatchActionToClearState}
                />
            </CommonPopUp>
            :state.selectedGameLevel===null?
            <CommonPopUp heading={'Please choose the difficulty level'}>
                <div className={'buttonContainer'}>
                    <CommonButton
                        name={'Easy'}
                        className={"easyButton"}
                        onClick={() => dispatchActionToSetDifficultyLevel('Easy')}
                    />
                    <CommonButton
                        name={'Medium'}
                        className={"mediumButton"}
                        onClick={() => dispatchActionToSetDifficultyLevel('Medium')}
                    />
                    <CommonButton
                        name={'Hard'}
                        className={"hardButton"}
                        onClick={() => dispatchActionToSetDifficultyLevel('Hard')}
                    />
                </div>
            </CommonPopUp>
            :state.gameGrid.length > 0 ? 
            <GameGrid
                gameGrid={state.gameGrid}
                onClickCell={dispatchActionToSetClickedCell}
            />:null}
        </div>
    )
};

export default Home;
