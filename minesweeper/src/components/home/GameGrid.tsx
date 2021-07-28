import React from 'react';
import _ from 'lodash';

import './Home.css';


const GameGrid = (props: AppNS.IGameGridProps) => {

    const cellHeight = 80/props.gameGrid.length;
    const cellWidth = 50/props.gameGrid[0].length;

    return (
        <div className={'gameGridContainer'}>
            {_.map(props.gameGrid, (eachRow, rowKey) => {
                return(
                    <div className={'rowContainer'} key={rowKey}>
                        {_.map(eachRow, (eachColumn, colKey) => {
                            return (
                                <div style={{
                                    height: `${cellHeight}vh`,
                                    width: `${cellWidth}vw`,
                                    backgroundColor: `${eachColumn.isOpen?'white':'#7EC850'}`,
                                    boxShadow: '0px 0px 1px 1px #70543e',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }} key={colKey} onClick={() => eachColumn.isOpen?null:props.onClickCell(rowKey, colKey)}>
                                    {eachColumn.isOpen?`${eachColumn.adjacentCellMines}`:null}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
};

export default GameGrid;
