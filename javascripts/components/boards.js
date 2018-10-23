import { loadBoards } from '../data/boardsData.js';

const bindEvents = () => {//added after, so dynamically onto the page
    $('#user-boards').on('click', '.board-card', (e) => {//board is the parent level of the card
        const clickedBoardId = $(e.target).closest('.board-card').attr('id'); //e.target in a jquery object, but we don't need the image itself so closest. to access the string, you can use .attr with the id of what you want from your JSON file.
        $('#boards-page').hide();//this had a display:none connected to it (html) that enabled it to hide.
        $('#pins-page').show();
        console.log(clickedBoardId);
    })
}

const writeBoards = (boards) => {
    let domString = '';
    boards.forEach(board => {
        domString += `
    <div id='${board.id}' class="board-card p-2">
            <img class="card-img-top" src="./db/default-img.jpeg" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${board.name}</h5>
          <p class="card-text">42 Pins</p>
        </div>
    </div>
        `
    });
    $('#user-boards').html(domString)
}

const initializeBoardView = () => {
    loadBoards().then((boards) => {
        //console.log('inside the .then');
        writeBoards(boards);//this to execute
        bindEvents();//and this next to execute
    }).catch((error) => {
        console.error(error);
    })
}

export { initializeBoardView }