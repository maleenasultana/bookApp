const userModel = require('../models/user.model');

module.exports ={
    findAll: function (req,res){
        userModel.find(req.query)
        .then(users => res.status(200).send(users ))
        .catch(error => res.status(422).send({
            message: "Internal server error"
        }))
    },
    create: function (req, res) {
        userModel.create(req.body)
            .then(user => res.status(200).send(user ))
            .catch(error => res.status(422).send({
                message: error
            }))
    },
    findById: function (req, res) {
        userModel.findById(req.params.id)
            .then(user  => res.status(200).send(user ))
            .catch(err => res.status(422).send({
                "err": err
            }))
    },
    update: function (req, res) {
        userModel.findByIdAndUpdate(req.params.id, req.body)
            .then(user  => res.status(200).send(user ))
            .catch(err => res.status(422).send({
                "err": err
            }))
    },
    remove: function (req, res) {
        userModel.findByIdAndRemove(req.params.id)
            .then(user  => res.status(200).send(user ))
            .catch(err => res.status(422).send({
                "err": err
            }))
    }
}
