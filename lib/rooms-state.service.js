/**
 * Created by bouguerr on 21/02/17.
 */
/**
 * Gère les rooms et leurs états
 * @type {{rooms: Array}}
 */

function Room(name) {
    this.name = name;
    this.questions = [];
    this.state = 'closed';
}

var RoomsState = {

    rooms: [],

    getRoom: function (name) {
        return this.rooms[name];
    },

    addRoom: function (name) {
        this.rooms[name] = new Room(name);
        console.log(this);
    },

    addQuestionToRoom: function (roomName, question) {

        this.rooms[roomName].questions.push(question);

    },
    
    removeQuestionFromRoom: function (roomName, questionId) {
        console.log(questionId);

        for(i = RoomsState.getRoom(roomName).questions.length - 1; i >= 0; i--) {
            if( RoomsState.getRoom(roomName).questions[i].id == questionId) RoomsState.getRoom(roomName).questions.splice(i,1);
        }
    }

}

module.exports = RoomsState;