/**
 * Created by bouguerr on 25/01/2017.
 */
var method = Question.prototype;

function Question(id, intitule, id_niveau, id_matiere) {
    this.id = id;
    this.intitule = intitule;
    this.id_niveau = id_niveau;
    this.id_matiere = id_matiere;
    this.reponses = [];
}

module.exports = Question;