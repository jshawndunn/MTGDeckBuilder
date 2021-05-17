'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      card.hasMany(deck)
    }
  };
  card.init({
    name: DataTypes.STRING,
    manaCost: DataTypes.STRING,
    cmc: DataTypes.INTEGER,
    colors: DataTypes.ARRAY(DataTypes.STRING),
    colorIdentity: DataTypes.ARRAY(DataTypes.STRING),
    type: DataTypes.STRING,
    types: DataTypes.ARRAY(DataTypes.STRING),
    subtypes: DataTypes.ARRAY(DataTypes.STRING),
    rarity: DataTypes.STRING,
    set: DataTypes.STRING,
    setName: DataTypes.STRING,
    text: DataTypes.STRING,
    flavor: DataTypes.STRING,
    artist: DataTypes.STRING,
    number: DataTypes.STRING,
    power: DataTypes.STRING,
    toughness: DataTypes.STRING,
    layout: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    printings: DataTypes.ARRAY(DataTypes.STRING),
    deckId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'card',
  });
  return card;
};