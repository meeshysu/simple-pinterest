import { loadPinsForBoard } from '../data/pinsData.js';

const shortenLink = (full_url) => {
    const hostname = new URL(full_url).hostname; //this is shortening that big ass link in the pins.json. .hostname cuts it down. that way you don't have to write a looping function - they all start differently, like www. http, etc. 
    return hostname;
}

const bindEvents = () => {
    $('#toBoardsBtn').click(() => {
        $('#pins-page').hide();
        $('#boards-page').show();
    })
}

const writePins = (pins) => {
    let domString = '';
    pins.forEach(pin => {
       domString += `
       <div id='${pin.id}' class='pcard pin-card align-self-start p-2'>
       <img class='card-img-top' src='${pin.image_url}'>
       <a href='${pin.link}' target='_blank' class='p-2'>
       <button type='button' class='btn btn-light'>${shortenLink(pin.link)}</button>
       </a>
       </div>
       `
    })
    $('#pins-on-board').html(domString);
}

const initializePinView = (boardId) => {
    //console.log('pins page', boardId);
    loadPinsForBoard(boardId)
    .then(data => {
    writePins(data);
    bindEvents();
    })
    .catch(error => {
        console.error('things messed up in pins yo', error)
    });
}

export { initializePinView }