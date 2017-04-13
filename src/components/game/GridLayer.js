import React from 'react';


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
        }

        static get propTypes(){
            return {
                height: React.PropTypes.number,
                width: React.PropTypes.number
            };
        }

        static get defaultProps(){
            return {
                height: 10,
                width: 10
            };
        }


        renderCell(){
            return (<td style={{border:'1px solid #def',boxSizing:'border-box'}}></td>);
        }

        renderRow(){
            let Cell = this.renderCell;
            const GRID_WIDTH = this.props.width;

            let cells = [], i;
            for(i = 0; i < GRID_WIDTH; i++){
                cells.push(<Cell key={i} />);
            }

            return (<tr>{cells}</tr>);
        }

        render(){
            let Row = this.renderRow;
            const GRID_HEIGHT = this.props.height;

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
}

export default GridLayer;
