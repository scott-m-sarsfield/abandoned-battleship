import React from 'react';

import {DirectionTypes} from '../../constants';

const GRID_WIDTH = 10,
GRID_HEIGHT= 10;

const styles = {
    absoluteFill:{
        position:'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    }
};

const Z_GRID_LAYER = 1,
Z_SHIP_LAYER = 2,
Z_PIN_LAYER = 3,
Z_CLICK_LAYER = 4;
/*
██████  ██ ███    ██
██   ██ ██ ████   ██
██████  ██ ██ ██  ██
██      ██ ██  ██ ██
██      ██ ██   ████
*/

class PinLayer extends React.Component{
    render(){
        return (
            <div style={{...styles.absoluteFill, zIndex:Z_PIN_LAYER}}>

            </div>
        );
    }
}
/*
███████ ██   ██ ██ ██████
██      ██   ██ ██ ██   ██
███████ ███████ ██ ██████
     ██ ██   ██ ██ ██
███████ ██   ██ ██ ██
*/

class ShipLayer extends React.Component{

    constructor(){
        super();

        this.state = {
            height: 200,
            width:200
        };
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

    componentDidMount(){
        //console.log(this.refs.container.offsetWidth,this.refs.container.offsetHeight);
        this.setState({
            height: this.refs.container.offsetHeight,
            width: this.refs.container.offsetWidth
        });
    }

    renderPiece({x,y,h,w}){
        const scale = this.state.height / 10;
        const padding = 2;

        return (
            <div style={{
                position:'absolute',
                top:(y*scale+padding)+'px',
                height:(h*scale-2*padding)+'px',
                width:(w*scale-2*padding)+'px',
                left:(x*scale+padding)+'px',
                background:'#ccc'
            }} />
        );
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

            //console.log(x,y,h,w);
            return (
                <Ship key={key} x={x} y={y} h={h} w={w} />
            );
        });

        //console.log(this.props);
        return (
            <div style={{...styles.absoluteFill, zIndex:Z_SHIP_LAYER}} ref="container">
            {_ships}
            </div>
        );
    }
}
/*
 ██████ ██      ██  ██████ ██   ██
██      ██      ██ ██      ██  ██
██      ██      ██ ██      █████
██      ██      ██ ██      ██  ██
 ██████ ███████ ██  ██████ ██   ██
*/

class ClickLayer extends React.Component{


    constructor(){
        super();

        this.renderCell = this.renderCell.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    static get propTypes(){
        return {
            onClickCell: React.PropTypes.func
        };
    }

    static get defaultProps(){
        return {
            onClickCell: function(){}
        };
    }

    renderCell(props){
        const {row,col} = props;
        return (<td data-row={row} data-col={col}></td>);
    }

    renderRow(props){
        const {row} = props;
        let Cell = this.renderCell;

        let cells = [], i;
        for(i = 0; i < GRID_WIDTH; i++){
            cells.push(<Cell key={i} row={row} col={i}/>);
        }

        return (<tr>{cells}</tr>);
    }

    handleClick(e){
        const dataset = e.target.dataset;
        this.props.onClickCell(parseInt(dataset.row),parseInt(dataset.col));
    }

    renderTable(){
        let Row = this.renderRow;

        let rows = [], i;
        for(i = 0; i < GRID_HEIGHT; i++){
            rows.push(<Row key={i} row={i}/>);
        }

        return (
            <table style={{borderCollapse:'collapse',height:'100%',width:'100%'}} onClick={this.handleClick}>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    render(){
        return (
            <div style={{...styles.absoluteFill, zIndex:Z_CLICK_LAYER}}>
            {this.renderTable()}

            </div>
        );
    }
}

/*
 ██████  ██████  ██ ██████
██       ██   ██ ██ ██   ██
██   ███ ██████  ██ ██   ██
██    ██ ██   ██ ██ ██   ██
 ██████  ██   ██ ██ ██████
*/

class GridLayer extends React.Component{

        constructor(){
            super();

            this.renderCell = this.renderCell.bind(this);
            this.renderRow = this.renderRow.bind(this);
            this.renderTable = this.renderTable.bind(this);
        }


        renderCell(){
            return (<td style={{border:'1px solid #def',boxSizing:'border-box'}}></td>);
        }

        renderRow(){
            let Cell = this.renderCell;

            let cells = [], i;
            for(i = 0; i < GRID_WIDTH; i++){
                cells.push(<Cell key={i} />);
            }

            return (<tr>{cells}</tr>);
        }

        renderTable(){
            let Row = this.renderRow;

            let rows = [], i;
            for(i = 0; i < GRID_HEIGHT; i++){
                rows.push(<Row key={i} />);
            }

            return (
                <table style={{borderCollapse:'collapse',height:'100%',width:'100%'}}>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        }

        render(){
            return (
                <div style={{...styles.absoluteFill, zIndex:Z_GRID_LAYER}}>
                {this.renderTable()}

                </div>
            );
        }
}
/*
██████   ██████   █████  ██████  ██████
██   ██ ██    ██ ██   ██ ██   ██ ██   ██
██████  ██    ██ ███████ ██████  ██   ██
██   ██ ██    ██ ██   ██ ██   ██ ██   ██
██████   ██████  ██   ██ ██   ██ ██████
*/

class Board extends React.Component{

    static get propTypes(){
        return {
            ships: React.PropTypes.object,
            shots: React.PropTypes.array,
            onShoot: React.PropTypes.func
        };
    }

    static get defaultProps(){
        return {
            onShoot: function(){}
        };
    }

    render(){
        const {ships,shots,onShoot} = this.props;

        return (
            <div style={{position:'relative',height:'300px',width:'300px',background:'#468'}}>
                <ShipLayer ships={ships}/>
                <PinLayer pins={shots}/>
                <GridLayer />
                <ClickLayer onClickCell={onShoot}/>
            </div>
        );
    }
}

export default Board;
