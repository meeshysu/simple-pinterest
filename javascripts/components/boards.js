import { loadBoards } from '../data/boardsData.js';
import { loadPinsOnBoards } from '../data/pinsData.js';
import { initializePinView } from '../components/pins.js';

const bindEvents = () => {//added after, so dynamically onto the page
    $('#user-boards').on('click', '.board-card', (e) => {//board is the parent level of the card
        const clickedBoardId = $(e.target).closest('.board-card').attr('id'); //e.target in a jquery object, but we don't need the image itself so 'closest'. to access the string, you can use .attr with the id of what you want from your JSON file.
        $('#boards-page').hide();//this had a display:none connected to it (html) that enabled it to hide.
        $('#pins-page').show();
       // console.log(clickedBoardId);
       initializePinView(clickedBoardId);
    })
}

const writeBoards = (boards) => {
    let domString = '';
    boards.forEach(board => {
        const boardImg = board.pins[0] ? board.pins[0].image_url : './db/default-img.jpeg'; //first image of the first array.
        domString += `
    <div id='${board.id}' class="board-card p-2">
            <img class="card-img-top" src="${boardImg}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${board.name}</h5>
          <p class="card-text">${board.pins.length}</p>
        </div>
    </div>
        `
    });
    $('#user-boards').html(domString)
}

const initializeBoardView = () => {
    loadBoards().then((boards) => { //first promise - loadboards. when it comes back successfully it returns an array of boards. once you have the array of boards you return the second promise loadpins that passes in the board. bc of the paranthesis it executes it. .then is actually on the loadpinsboards. it is in the resolve for that promise. that was done bc we had to pass boards correctly. 
        //console.log('inside the .then');
        // writeBoards(boards);//this to execute
        // bindEvents();//and this next to execute
        return loadPinsOnBoards(boards); //going to return the second promise function (function that holds the second promise). below we then chain a .then method.
    }).then((boardsWithPins) => {
        writeBoards(boardsWithPins);
        bindEvents();
    }).catch((error) => {
        console.error(error);
    })
}

export { initializeBoardView }