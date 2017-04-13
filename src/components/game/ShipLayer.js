import React from 'react';
import {ShipTypes,DirectionTypes} from '../../constants/';


/*
███████ ██   ██ ██ ██████
██      ██   ██ ██ ██   ██
███████ ███████ ██ ██████
     ██ ██   ██ ██ ██
███████ ██   ██ ██ ██
*/

class ShipLayer extends React.Component{

    static get propTypes(){
        return {
            ships: React.PropTypes.object,
            parentHeight: React.PropTypes.number
        };
    }

    static get defaultProps(){
        return {
            ships: {},
            parentHeight:0
        };
    }

    renderPiece({x,y,h,w,shipType,shipSrc}){
        const scale = this.props.parentHeight / 10;
        const padding = 2;

        return (
            <div style={{
                position:'absolute',
                top:(y*scale+padding)+'px',
                height:(h*scale-2*padding)+'px',
                width:(w*scale-2*padding)+'px',
                left:(x*scale+padding)+'px',
                background:'transparent'
            }}>
                <img
                    style={{height:'100%',width:'100%'}}
                    alt={shipType}
                    src={shipSrc}
                />
            </div>
        );
    }

    getSrc(ship){
        return "img/ships/"+function(type){
            switch(type){
                case ShipTypes.AIRCRAFT_CARRIER:
                    return "ship0";
                case ShipTypes.BATTLESHIP:
                    return "ship1";
                case ShipTypes.DESTROYER:
                    return "ship3";
                case ShipTypes.SUBMARINE:
                    return "ship2";
                case ShipTypes.PATROL_BOAT:
                    return "ship4";
            }
            return "ship0";
        }(ship.type)+"_"+function(direction){
            switch(direction){
                case DirectionTypes.UP:
                    return "north";
                case DirectionTypes.LEFT:
                    return "west";
                case DirectionTypes.RIGHT:
                    return "east";
                case DirectionTypes.DOWN:
                    return "south";
            }
        }(ship.direction)+"_set.png";
    }

    render(){
        const {ships} = this.props;

        const Ship = this.renderPiece.bind(this);

        const _ships = Object.keys(ships).filter(key=>{
            return ships[key].origin; // must have coordinates
        }).map(key=>{
            const ship = ships[key];
            const x = (ship.direction === DirectionTypes.LEFT) ? (ship.origin.x - (ship.length-1)) : ship.origin.x;
            const y = (ship.direction === DirectionTypes.UP) ? (ship.origin.y - (ship.length-1)) : ship.origin.y;
            const h = (ship.direction === DirectionTypes.UP || ship.direction === DirectionTypes.DOWN) ? ship.length : 1;
            const w = (ship.direction === DirectionTypes.LEFT || ship.direction === DirectionTypes.RIGHT) ? ship.length : 1;

            return (
                <Ship key={key} x={x} y={y} h={h} w={w} shipType={ship.type} shipSrc={this.getSrc(ship)}/>
            );
        });

        return (
            <div >
                {_ships}
            </div>
        );
    }
}

export default ShipLayer;
