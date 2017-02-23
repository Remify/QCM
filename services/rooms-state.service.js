/**
 * Created by bouguerr on 21/02/17.
 */
/**
 * Gère les rooms et leurs états
 * @type {{rooms: Array}}
 */

var states = {
    stopped: 'stopped',
    started: 'started'
};

function Room(name) {
    this.name = name;
    this.questions = [];
    this.state = 'stopped';
    this.users = [];

    this.changeState = function (state) {
        if (state === states.started) {
            this.state = states.started;
        } else if (state === states.stopped) {
            this.state = states.stopped;
        } else {
            this.state = states.stopped;
        }

        console.log(this);
    }
}

var RoomsState = {

    rooms: [],

    getRoom: function (name) {
        return this.rooms[name];
    },

    addRoom: function (name) {
        this.rooms[name] = new Room(name);
    },

    addQuestionToRoom: function (roomName, question) {

        var arrSameQuestion = this.rooms[roomName].questions.filter(function (q) {
                return q.id == question.id
            }
        );

        if (arrSameQuestion.length == 0) {
            this.rooms[roomName].questions.push(question);
        }

    },

    removeQuestionFromRoom: function (roomName, questionId) {
        console.log(questionId);

        for (i = RoomsState.getRoom(roomName).questions.length - 1; i >= 0; i--) {
            if (RoomsState.getRoom(roomName).questions[i].id == questionId) {

                RoomsState.getRoom(roomName).questions.splice(i, 1);
            }
        }
    },

    newRoomUser: function (roomName, userName) {
        if(this.rooms[roomName].users.indexOf(userName) < 0) {
            this.rooms[roomName].users.push(userName);
            return {code: 200, message: 'new user' };
        } else {
            return {code: 304, message: 'user already exist' };
        }
    },

    removeRoomUser: function (roomName, userName) {

        for (i = RoomsState.getRoom(roomName).users.length - 1; i >= 0; i--) {
            if (RoomsState.getRoom(roomName).users[i] === userName) {
                RoomsState.getRoom(roomName).users.splice(i, 1);
            }
        }
    }

}

module.exports = RoomsState;