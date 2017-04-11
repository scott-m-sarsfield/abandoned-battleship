import {ShipTypes,DirectionTypes} from '../../constants';

/*
 ██████  ██████  ██████   ██████  ███    ██ ███████ ███    ██ ████████
██    ██ ██   ██ ██   ██ ██    ██ ████   ██ ██      ████   ██    ██
██    ██ ██████  ██████  ██    ██ ██ ██  ██ █████   ██ ██  ██    ██
██    ██ ██      ██      ██    ██ ██  ██ ██ ██      ██  ██ ██    ██
 ██████  ██      ██       ██████  ██   ████ ███████ ██   ████    ██
*/
function CPUOpponent(){
    this.ships = [];
    this.shotCount = 0;
}

CPUOpponent.prototype.getShot = function getShot(){
    const shot = {
        x: this.shotCount % 10,
        y: Math.floor(this.shotCount / 10)
    };
    this.shotCount++;
    return shot;
};

CPUOpponent.prototype.getShips = function getShips(){
    return {
        [ShipTypes.AIRCRAFT_CARRIER] : {
            type:ShipTypes.AIRCRAFT_CARRIER,
            origin:{
                x:9,
                y:0
            },
            direction:DirectionTypes.LEFT
        },
        [ShipTypes.BATTLESHIP] : {
            type:ShipTypes.BATTLESHIP,
            origin:{
                x:0,
                y:9
            },
            direction:DirectionTypes.UP
        },
        [ShipTypes.SUBMARINE] : {
            type:ShipTypes.SUBMARINE,
            origin:{
                x:0,
                y:1
            },
            direction:DirectionTypes.DOWN
        },
        [ShipTypes.DESTROYER] : {
            type:ShipTypes.DESTROYER,
            origin:{
                x:1,
                y:1
            },
            direction:DirectionTypes.RIGHT
        },
        [ShipTypes.PATROL_BOAT] : {
            type:ShipTypes.PATROL_BOAT,
            origin:{
                x:9,
                y:1
            },
            direction:DirectionTypes.DOWN
        }
    };
};

export default CPUOpponent;
