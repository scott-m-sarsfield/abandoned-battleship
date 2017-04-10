import {ShipTypes,DirectionTypes} from '../../constants';

export default {
    [ShipTypes.AIRCRAFT_CARRIER] : {
        type:ShipTypes.AIRCRAFT_CARRIER,
        origin:{
            x:0,
            y:0
        },
        direction:DirectionTypes.RIGHT
    },
    [ShipTypes.BATTLESHIP] : {
        type:ShipTypes.BATTLESHIP,
        origin:{
            x:9,
            y:9
        },
        direction:DirectionTypes.UP
    },
    [ShipTypes.SUBMARINE] : {
        type:ShipTypes.SUBMARINE,
        origin:{
            x:9,
            y:1
        },
        direction:DirectionTypes.DOWN
    },
    [ShipTypes.DESTROYER] : {
        type:ShipTypes.DESTROYER,
        origin:{
            x:8,
            y:1
        },
        direction:DirectionTypes.LEFT
    },
    [ShipTypes.PATROL_BOAT] : {
        type:ShipTypes.PATROL_BOAT,
        origin:{
            x:0,
            y:1
        },
        direction:DirectionTypes.DOWN
    }
};
