const Product = require('../models/product');

module.exports.scrapper = async function(req, res){
    try {
        let items = req.body.items;
        // console.log(items);
        let priceDropped = false;
        let priceDroppedItems = [];
        for(item of items){
            let product = await Product.findOne({itemId: item.itemId});
            if(product){
                if(product.price==item.price) continue;
                if(product.price > item.price){
                    priceDropped = true;
                    const object = {
                        product: product,
                        newPrice: item.price
                    };
                    priceDroppedItems.push(object);
                }
                product.price = item.price;
                await product.save();
            }else{
                await Product.create(item);
            }
        }
        if(priceDropped){
            return res.status(200).json({
                data:{
                    message: 'Prices of items have dropped',
                    priceDropped: true,
                    priceDroppedItems: priceDroppedItems,
                }
            });
        }else{
            return res.status(200).json({
                data:{
                    message: 'Product list is updated',
                }
            });
        }
    } catch (error) {
        console.log('Error in scrap controller: ', error);
        return res.status(500).json({
            data:{
                message: 'Server error while scrapping'
            }
        });
    }
    
}


module.exports.destroy = async function(req, res){
    try{
        let item = await Product.findOne({itemId: req.params.id});
        item.remove();
        return res.status(200).json({
            data:{
                message:{
                    item: item.name,
                    data:'Item deleted successfully'
                }
            }
        });
    }catch (err){
        console.log('Error in destroy item controller: ', err);
        return res.status(500).json({
            data:{
                message: 'Server error while deletein item'
            }
        });
    }
}