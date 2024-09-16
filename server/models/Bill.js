//-------------------------------- knight
module.exports = (sequelize, DataTypes) => {

    const Bill = sequelize.define("Bill", {
        totalPrice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalArt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    });

    Bill.associate = (models) => {
        Bill.hasMany(models.Order, {
            onDelete: "cascade",
        });
    };

    return Bill;
};
//-------------------------------- knight