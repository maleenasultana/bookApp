const userModel = require('../models/user.model');
const bookModel = require('../models/books.model');

exports.bookOnRent = async(req, res) => {
    const id = req.body.id;
    const isbn = req.body.isbn
    let user
    try{
        user = await userModel.findOne({
            id : id
        });
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message: " Internalserver error!",
            succeess : false
        })
    }
    try{
        const book = await bookModel.findOne({
            isbn: isbn
        });
        console.log(book)
        if (user.haveBooks) {
            user.haveBooks.push(book._id);
        } else {
            user.haveBooks = [book._id]
        }
        console.log(user)
        await user.save()
        return res.status(201).send({
            message: "book rent successfully!",
            success: true
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Intarnal server error!",
            success: false
        })
    }
}
    
