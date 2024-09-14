module.exports = (sequelize, DataTypes) => {

    const Art = sequelize.define("Art", {
        titile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Art.associate = (models) => {
        Art.hasMany(models.Comment, {
            onDelete: "cascade",
        });
    };

    return Art;
};