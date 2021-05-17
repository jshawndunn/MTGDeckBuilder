'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      deck.belongsTo(user),
      deck.belongsTo(card)
    }
  };
  deck.init({
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'deck',
  });
  return deck;
};