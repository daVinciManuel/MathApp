'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Users', 'name_2');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addIndex('Users', ['name'], {
      unique: true,
      name: 'name_2'
    })
  }
};
