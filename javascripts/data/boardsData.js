const loadBoards = () => {
    return new Promise((resolve, reject) => {
        $.get('../db/boards.json')//ajax get request
        .done((data) => {
            console.log(data)
            resolve(data.boards);
        })
        .fail((error) => {
            reject(error);
        })
    });
};
    

export { loadBoards };