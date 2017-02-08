/**
 * Created by bouguerr on 25/01/2017.
 */
var method = Question.prototype;

function Question(id, intitule) {
    this.id = id;
    this.intitule = intitule;
    this.reponses = [];
}

module.exports = Question;