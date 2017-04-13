import React from 'react';

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
        const GRID_WIDTH = this.props.width;
        let Cell = this.renderCell;

        let cells = [], i;
        for(i = 0; i < GRID_WIDTH; i++){
            cells.push(<Cell key={i} row={row} col={i}/>);
        }

        return (<tr>{cells}</tr>);
    }

    handleClick(e){
        const dataset = e.target.dataset;
        this.props.onClickCell(parseInt(dataset.col),parseInt(dataset.row));
    }

    render(){
        let Row = this.renderRow;
        const GRID_HEIGHT = this.props.height;

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
}

export default ClickLayer;
