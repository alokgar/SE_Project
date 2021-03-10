let cart = null;

module.export = class Cart{
    
    static additem(product,quantity){
        if(cart===null){
            cart = {items : []}
        }
        var pIdx = cart.items.findIndex(p => p.id == product.id);
        if(pIdx > -1){
            cart.items[pIdx].quant = quantity;
        }
        else{
            product.quant = quantity;
            cart.items.push(product);
        }
    }

    static removeitem(product){
        var pIdx = cart.items.findIndex(p => p.id == product.id);
        if(pIdx > -1){
            cart.items.splice(pIdx,1);
        }
    }
    
    static getcart(){
        return cart;
    }
}