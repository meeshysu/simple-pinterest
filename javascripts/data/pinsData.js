const loadPinsForBoard = (boardId) => { //this is for a single board
    return new Promise((resolve, reject) => {
        $.get('../db/pins.json')
        .done((data) => {
             const pinsForBoards = data.pins.filter(pin => pin.board_id == boardId) //taking the pin data and then does a compartive function from pin.board_id equals the board_id found in the JSON file.  
             //Double equals boardId passing from initialPinView on the boards.js file. The clicked board id gets returned out of getting the id from the attribute. It's the number inside of the string, but bc it's not the same type (string vs number). double equals will force it to see that they are the same. 
             //console.log(pinsForBoards);
             resolve(pinsForBoards);
        })
        .fail((error) => {
            reject(error);
        })
    })
};


const loadPinsOnBoards = (boards) => { //boards is coming in from loadboards, which is the first promise that came from boards.js. 
    return new Promise((resolve, reject) => {
        $.get('../db/pins.json')
        .done((data) => { //data came back from pins.json. in an array of objects - though it's a key. 
            const boardsWithPins = boards.map(board => { //want to find the matching pins. and bc all we want are the pins, we need to do filtering on the pins. data.pins gives you an array of objects. the filter method, then on it. will expose one pin and explicitly return if it matches. pin.board_id = board id. 
                const matchingPins = data.pins.filter(pin => pin.board_id  === board.id);// now below we want to add the pins to the board.
                board.pins = matchingPins; //have your board object as you want it to be. so gotta return out the board.
                return board; //this will return out this board back to the boardswithpins variable. after map runs, it will be an array of objects with manipulated boards < filter equals array.
            })
            resolve(boardsWithPins);
        })
        .fail((error) => {
            reject('error loadPinsOnBoards', error);
        })
    })
}
//you want to loop through the boards bc that's holding the information. map function instead! will go through all the boards, similiar to a for each but it will return out the data, yet still have a single board exposed. MAP doesn't change the amount of the index, just the value. it doesn't manipulate the original array, just returns the new one. 


export { loadPinsForBoard, loadPinsOnBoards };