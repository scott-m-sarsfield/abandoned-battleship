import React from 'react';

/*
██████  ██ ███    ██
██   ██ ██ ████   ██
██████  ██ ██ ██  ██
██      ██ ██  ██ ██
██      ██ ██   ████
*/

class PinLayer extends React.Component{

    constructor(){
        super();

        this.renderPin = this.renderPin.bind(this);
    }

    static get propTypes(){
        return {
            pins: React.PropTypes.arrayOf(React.PropTypes.shape({
                x: React.PropTypes.number.isRequired,
                y: React.PropTypes.number.isRequired,
                hit: React.PropTypes.bool.isRequired
            })),
            parentHeight: React.PropTypes.number.isRequired
        };
    }

    static get defaultProps(){
        return {
            pins: [],
            parentHeight:0
        };
    }

    renderPin(pin,i){

        const scale = this.props.parentHeight / 10;
        const padding = 2;//Math.floor(scale/4);
        const x = pin.x;
        const y = pin.y;

        return (
            <div key={i} style={{
                position:'absolute',
                top:(y*scale+padding)+'px',
                height:(scale-2*padding)+'px',
                width:(scale-2*padding)+'px',
                left:(x*scale+padding)+'px'
            }}>
                <img
                    style={{width:'100%',height:'100%'}}
                    alt={pin.hit? "hit" : "miss"}
                    src={"img/"+(pin.hit?"hit":"miss")+".png"}
                />
            </div>
        );
    }

    render(){

        const {pins} = this.props;
        const _pins = pins.map(this.renderPin);

        return (
            <div>
                {_pins}
            </div>
        );
    }
}

export default PinLayer;
