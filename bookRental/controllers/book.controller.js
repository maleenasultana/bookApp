const book =require('../models/books.model');

module.exports ={
    findAll: function (req,res){
        book.find(req.query)
        .then(books => res.status(200).send(books))
        .catch(error => res.status(422).send({
            message: "Internal server error"
        }))
    },
    create: function (req, res) {
        book.create(req.body)
            .then(book => res.status(200).send(book))
            .catch(error => res.status(422).send({
                message: error
            }))
    },
    findById: function (req, res) {
        book.findById(req.params.id)
            .then(book => res.status(200).send(book))
            .catch(err => res.status(422).send({
                "err": err
            }))
    },
    update: function (req, res) {
        book.findByIdAndUpdate(req.params.id, req.body)
            .then(book => res.status(200).send(book))
            .catch(err => res.status(422).send({
                "err": err
            }))
    },
    remove: function (req, res) {
        book.findByIdAndRemove(req.params.id)
            .then(book => res.status(200).send(book))
            .catch(err => res.status(422).send({
                "err": err
            }))
    }
}
