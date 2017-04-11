/* eslint-env node, mocha */
var expect = require('chai').expect;
var sinon = require('sinon');

import CPUGameFacilitator from '../CPUGameFacilitator';
import MY_SHIPS from '../ShipLayoutOne';
import CPUOpponent from '../CPUOpponent';

import {StateTypes,HistoryTypes,ShipTypes} from '../../../constants';

describe('CPUGameFacilitator',function(){
    var game,historySpy;
    beforeEach(()=>{
        historySpy = sinon.spy();
        game = new CPUGameFacilitator({
            opponent: new CPUOpponent(),
            actions:{
                addGameHistory: historySpy
            }
        });
    });

    describe("initialization",()=>{
        it("constructs an instance of the class",()=>{
            expect(game).to.be.an.instanceOf(CPUGameFacilitator);
        });

        it("initializes with NOT_STARTED and empty values for ships and shots",()=>{
            expect(game.getState()).to.equal(StateTypes.NOT_STARTED);
            expect(game.getPlayerShips()).to.deep.equal({});
            expect(game.getOpponentShips()).to.deep.equal({});
            expect(game.getPlayerShots()).to.deep.equal([]);
            expect(game.getOpponentShots()).to.deep.equal([]);
        });

        it("does not allow a player to shoot at a cell before setting ships",()=>{
            expect(game.shootCell(0,0)).to.equal(false);
        });

        it("changes state to YOUR_TURN after receiving ship placements",()=>{
            game.setShipPositions(MY_SHIPS);
            expect(game.getState()).to.equal(StateTypes.YOUR_TURN);
        });
    });

    describe("game play",()=>{
        beforeEach(()=>{
            game.setShipPositions(MY_SHIPS);
        });

        describe("history",()=>{
            it("will add a GAME_STARTED item to the history after ships are submitted",()=>{
                expect(historySpy.called).to.equal(true);

                const arr = historySpy.args[0][0];

                expect(arr[0].type).to.equal(HistoryTypes.GAME_STARTED);
            });

            it("will add a SHOT_HIT item to the history when a shot hits a ship",()=>{
                game.shootCell(9,0);
                expect(historySpy.callCount).to.equal(2);

                const arr = historySpy.args[1][0]; // second call (after GAME_STARTED)
                expect(arr[0].type).to.equal(HistoryTypes.SHOT_HIT);
            });

            it("will add a SHOT_MISS item to the history when a shot misses a ship",()=>{
                game.shootCell(0,0);
                expect(historySpy.callCount).to.equal(2);

                const arr = historySpy.args[1][0]; // second call (after GAME_STARTED)
                expect(arr[0].type).to.equal(HistoryTypes.SHOT_MISS);
            });

            it("will add a SHIP_SUNK item to the history when a ship is sunk",()=>{
                game.shootCell(9,1);
                game.shootCell(9,2);

                expect(historySpy.callCount).to.equal(3); // game started + 2 shots

                const arr = historySpy.args[2][0];
                expect(arr[0].type).to.equal(HistoryTypes.SHOT_HIT);
                expect(arr[1].type).to.equal(HistoryTypes.SHIP_SUNK);
            });
        });

        describe("status",()=>{
            it("will tell me the type and status of enemy ships before they are sunk",()=>{
                const ships = game.getOpponentShips();
                expect(ships[ShipTypes.AIRCRAFT_CARRIER].type).to.exist;
                expect(ships[ShipTypes.AIRCRAFT_CARRIER].alive).to.exist;
            });

            it("will not tell me the origin nor direction of enemy ships before they are sunk",()=>{
                const ships = game.getOpponentShips();
                expect(Object.keys(ships)).to.have.lengthOf(5); // 5 ships.
                expect(ships[ShipTypes.AIRCRAFT_CARRIER].origin).to.not.exist;
                expect(ships[ShipTypes.AIRCRAFT_CARRIER].direction).to.not.exist;
            });

            it("will tell me the origin and direction of an enemy ship when it is sunk",()=>{
                game.shootCell(9,1);
                game.shootCell(9,2);
                const ships = game.getOpponentShips();
                expect(ships[ShipTypes.PATROL_BOAT].origin).to.exist;
                expect(ships[ShipTypes.PATROL_BOAT].direction).to.exist;
            });
            it("will record the shots I take",()=>{
                game.shootCell(9,1);
                const shots = game.getPlayerShots();
                expect(shots).to.include({x:9,y:1});
            });
            it("will reflect an opponent's shot as well as mine",()=>{
                game.shootCell(9,1);
                const my_shots = game.getPlayerShots();
                const their_shots = game.getOpponentShots();
                expect(my_shots).to.have.lengthOf(1);
                expect(their_shots).to.have.lengthOf(1);
            });

            it("will indicate game over when all the opponent ships are sunk",()=>{
                let i;
                for(i = 0; i <= 4; i++){
                    game.shootCell(i+4,0);
                    game.shootCell(i+1,1);
                    game.shootCell(9,i);
                    game.shootCell(0,i);
                    game.shootCell(0,i+5);
                }
                expect(game.getState()).to.equal(StateTypes.GAME_OVER);
            });
        });


    });



});
