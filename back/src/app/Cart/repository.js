const Cart = require("./model");
exports.cart = async (email) => {
    const _cart = await Cart.findOne({"email": email}).populate({
        path: "items.productId",
        select: "name price total"
    });
    return _cart;
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
}