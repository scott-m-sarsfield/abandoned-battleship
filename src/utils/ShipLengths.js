import * as ShipTypes from './ShipTypes';

let ShipLengths = {};
ShipLengths[ShipTypes.AIRCRAFT_CARRIER] = 5;
ShipLengths[ShipTypes.BATTLESHIP] = 4;
ShipLengths[ShipTypes.SUBMARINE] = 3;
ShipLengths[ShipTypes.DESTROYER] = 3;
ShipLengths[ShipTypes.PATROL_BOAT] = 2;

export default ShipLengths;
