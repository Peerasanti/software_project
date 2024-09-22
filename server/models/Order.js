module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("Order", {
        artName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        billIdReference: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    });

    return Order;
};
