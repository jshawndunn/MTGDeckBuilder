'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      manaCost: {
        type: Sequelize.STRING
      },
      cmc: {
        type: Sequelize.INTEGER
      },
      colors: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      colorIdentity: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      type: {
        type: Sequelize.STRING
      },
      types: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      subtypes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      rarity: {
        type: Sequelize.STRING
      },
      set: {
        type: Sequelize.STRING
      },
      setName: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      flavor: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      power: {
        type: Sequelize.STRING
      },
      toughness: {
        type: Sequelize.STRING
      },
      layout: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      printings: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cards');
  }
};