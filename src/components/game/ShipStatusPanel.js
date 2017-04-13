import React from 'react';

class ShipStatusPanel extends React.Component{

    constructor(){
        super();

        this.renderShipStatus = this.renderShipStatus.bind(this);
    }

    static get propTypes(){
        return {
            ships: React.PropTypes.object
        };
    }

    static get defaultProps(){
        return {
            ships: {}
        };
    }

    renderShipStatus(ship){

        const styles={
            border:'solid 1px',
            background: (ship.alive) ? "#0f0" : "#e22",
            display:'inline-block',
            padding:'0.5em'
        };

        return (
            <div key={ship.type} style={styles}>
                {ship.type} [{ship.length}]
            </div>
        );
    }

    render(){
        console.log(this.props);

        const ships = Object.keys(this.props.ships).map(sh=>this.props.ships[sh]);

        const _ships = ships.map(this.renderShipStatus);

        return (
            <div>
            {_ships}
            </div>
        );
    }
}


export default ShipStatusPanel;
