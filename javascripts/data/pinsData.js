const loadPinsForBoard = (boardId) => {
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

export { loadPinsForBoard };