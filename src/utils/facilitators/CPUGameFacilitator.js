// (Maybe going overboard on constants.)

import {HistoryTypes,StateTypes,ShipLengths,DirectionTypes} from '../../constants';


import CPUOpponent from './CPUOpponent';


import{matrix,objectValues} from '../Misc';
const mapObj = require('map-obj');

//window.EXPECT = require('chai').expect;



const CellTypes = {
    NOTHING:"NOTHING",
    SHIP:"SHIP",
    SHOT_MISS:"SHOT_MISS",
    SHOT_HIT:"SHOT_HIT"
};

const WIDTH = 10, HEIGHT = 10;


/*
███████  █████   ██████ ██ ██      ██ ████████  █████  ████████  ██████  ██████
██      ██   ██ ██      ██ ██      ██    ██    ██   ██    ██    ██    ██ ██   ██
█████   ███████ ██      ██ ██      ██    ██    ███████    ██    ██    ██ ██████
██      ██   ██ ██      ██ ██      ██    ██    ██   ██    ██    ██    ██ ██   ██
██      ██   ██  ██████ ██ ███████ ██    ██    ██   ██    ██     ██████  ██   ██
*/

function CPUGameFacilitator({opponent,actions}){
    this.opponent = opponent || new CPUOpponent();

    this.gameState = StateTypes.NOT_STARTED;
    this.playerShips = {};
    this.playerShots = [];
    this.opponentShips = {};
    this.opponentShots = [];
    this.history = [];

    this.actions = {
        addGameHistory: ()=>{},
        setGameState: ()=>{},
        ...actions
    };
}

// -----------------------------------------------------------------------------
// ACCESSORS

CPUGameFacilitator.prototype.getState = function getState(){
    return this.gameState;
};

CPUGameFacilitator.prototype.getPlayerShips = function getPlayerShips(){
    return this.playerShips;
};

CPUGameFacilitator.prototype.getOpponentShips = function getOpponentShips(){
    return mapObj(this.opponentShips,(key,value)=>{
        const {type,alive} = value;
        const o = {type,alive};

        if(!alive) return [key,value];
        else return [key,o];
    });
};

CPUGameFacilitator.prototype.getPlayerShots = function getPlayerShots(){
    return this.playerShots;
};

CPUGameFacilitator.prototype.getOpponentShots = function getOpponentShots(){
    return this.opponentShots;
};


// -----------------------------------------------------------------------------
// GRID CONSTRUCTION

function getCells(origin,direction,length){

    var arr = [];

    var o = {...origin};
    var j;
    for(j = 0; j < length;j++){
        arr.push({...o});

        if(direction === DirectionTypes.UP) o.y--;
        if(direction === DirectionTypes.DOWN) o.y++;
        if(direction === DirectionTypes.LEFT) o.x--;
        if(direction === DirectionTypes.RIGHT) o.x++;
    }

    return arr;
}

function constructGrid(ships , shots ){
    let grid = matrix(WIDTH,HEIGHT,CellTypes.NOTHING);
    ships = objectValues(ships);

    var i;
    for(i = 0; i < ships.length; i++){
        var shipLength = ShipLengths[ships[i].type];
        var direction = ships[i].direction;

        var o = getCells(ships[i].origin,direction,shipLength);

        for(var j = 0; j < shipLength; j++){
            grid[ o[j].x ][ o[j].y ] = CellTypes.SHIP;
        }
    }

    for(i = 0; i < shots.length; i++){
        const {x,y} = shots[i];
        if(grid[x][y] === CellTypes.SHIP) grid[x][y] = CellTypes.SHOT_HIT;
        else grid[x][y] = CellTypes.SHOT_MISS;
    }

    return grid;
}

function constructShipGrid(ships){
    let grid = matrix(WIDTH,HEIGHT,null);
    ships = objectValues(ships);

    var i;
    for(i = 0; i < ships.length; i++){
        var shipLength = ShipLengths[ ships[i].type ];
        var cells = getCells(
            ships[i].origin,
            ships[i].direction,
            shipLength
        );
        for(var j = 0; j < shipLength; j++){
            grid[ cells[j].x ][ cells[j].y ] = ships[i];
        }
    }

    return grid;
}

// -----------------------------------------------------------------------------
// CONSOLE GRID RENDERING

function drawBoard(grid){
    // eslint-disable-next-line
    //console.log(ships);

    const CELL_INNER_SIZE = 3;
    const BOARD_LENGTH = 11+CELL_INNER_SIZE*WIDTH;

    let console_str = "";
    function log(){
        console_str += Array.prototype.slice.call(arguments).join(" ") + "\n";
    }

    function drawLine(){
        log(Array(BOARD_LENGTH).fill("-").join(""));
    }

    function drawCell(i,j){

        switch(grid[j][i]){
            case CellTypes.SHIP:
                return "S";
            case CellTypes.SHOT_HIT:
                return "H";
            case CellTypes.SHOT_MISS:
                return "M";
            case CellTypes.NOTHING:
            default:
                return " ";
        }

    }

    function drawRow(i){
        var str = "";
        for(var j = 0; j < WIDTH; j++){
            str += "|" + " " + drawCell(i,j) + " ";
        }
        str += "|";
        log(str);
    }

    var i;
    for(i = 0; i < HEIGHT; i++){
        drawLine();
        drawRow(i);
    }
    drawLine();

    // eslint-disable-next-line
    console.log(console_str);

}

CPUGameFacilitator.prototype.drawOpponentBoard = function drawOpponentBoard(){
    drawBoard(
        constructGrid(this.opponentShips,this.playerShots)
    );
};

CPUGameFacilitator.prototype.drawMyBoard = function drawMyBoard(){
    drawBoard(
        constructGrid(this.playerShips,this.opponentShots)
    );
};

function tackOnAliveStatus(ships){
    return mapObj(ships,(key,value)=>{
        return [key,{
            ...value,
            alive:true
        }];
    });
}

CPUGameFacilitator.prototype.setShipPositions = function setShipPositions(ships){
    // benefit of doubt (for now)

    this.playerShips = tackOnAliveStatus(ships);
    this.opponentShips = tackOnAliveStatus(this.opponent.getShips());

    this.actions.addGameHistory([
        {type:HistoryTypes.GAME_STARTED}
    ]);

    this.gameState = StateTypes.YOUR_TURN;
    this.actions.setGameState(this.gameState);
};

function shipSunk(x,y,ships,shots){

    let grid = constructGrid(ships,shots);
    grid[x][y] = CellTypes.SHOT_HIT;
    const shipAtCell = constructShipGrid(ships)[x][y];
    const shipCells = getCells(
        shipAtCell.origin,
        shipAtCell.direction,
        ShipLengths[ shipAtCell.type ]
    );

    if( shipCells.every(coord => (grid[coord.x][coord.y] === CellTypes.SHOT_HIT))){
        return shipAtCell;
    }
    return null;
}

CPUGameFacilitator.prototype.shootCell = function shootCell(x,y){
    // Only can shoot when it is the players turn.
    if(this.gameState !== StateTypes.YOUR_TURN) return false;


    let grid = constructGrid(this.opponentShips,this.playerShots);

    if(grid[x][y] === CellTypes.SHOT_HIT || grid[x][y] === CellTypes.SHOT_MISS) return false; // don't allow this.

    let hit = (grid[x][y] === CellTypes.SHIP);

    let history = [
        {
            type: ( hit ? HistoryTypes.SHOT_HIT : HistoryTypes.SHOT_MISS ),
            x,
            y
        }
    ];

    if(hit){
        let ship = shipSunk(x,y,this.opponentShips,this.playerShots);

        if(ship){
            // update ship status
            this.opponentShips[ship.type] = {
                ...ship,
                alive: false
            };

            // add history item
            history.push({
                type: HistoryTypes.SHIP_SUNK,
                ship
            });
        }
    }

    this.actions.addGameHistory(history);

    this.playerShots.push({
        x,
        y
    });

    this.gameState = StateTypes.YOUR_TURN;
    this.actions.setGameState(this.gameState);


    return true;
};

export default CPUGameFacilitator;
