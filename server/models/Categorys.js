module.exports = (sequelize, DataTypes) => {

    const Categorys = sequelize.define("Categorys", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Categorys;
};