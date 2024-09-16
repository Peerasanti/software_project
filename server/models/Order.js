//-------------------------------- knight
module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("Order", {
        orderDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

    });

    return Order;
};

//-------------------------------- knight