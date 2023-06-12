const sellerItemDetail = require('../model/details');

exports.addItemDetails = (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    sellerItemDetail.create({
        name: name,
        price: price,
        description: description,
        quantity: quantity
    })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getItemDetails = (req, res, next) => {
    sellerItemDetail.findAll()
        .then(products => {
            res.setHeader('Content-Type', 'text/html');
            res.send(JSON.stringify(products));
        })
        .catch(err => {
            console.log(err);
        });
}

exports.updateItemDetail = async (req, res, next) => {
    const prodId = req.params.productId;
    const number = Number(req.params.number);
    const quantity = await sellerItemDetail.findOne({
        attributes: ['quantity'],
        where: {
            id: prodId,
        },
    });
    let updatedQuantity = quantity.dataValues.quantity - number;
    if(updatedQuantity < 0){
        updatedQuantity = 0;
    }
    await sellerItemDetail.update(
        { quantity: updatedQuantity },
        { where: { id: prodId } }
    )
        .then((result) => {
            res.redirect('/');
        })
        .catch((error) => {
            console.error(error);
        });

}

