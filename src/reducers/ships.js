
const initialState = {
    playerShips:[
        {
            name:"Inner-tube",
            alive: true,
            coordinates:[
                {
                    x:0,
                    y:0
                }
            ]
        }
    ],
    opponentShips:[
        {
            name:"Inner-tube",
            alive: true
        }
    ]
};

export function ships(state=initialState,action){
    return state;
}
