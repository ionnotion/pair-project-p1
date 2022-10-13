'use strict';
const fs = require(`fs`)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let insertData = JSON.parse(fs.readFileSync(`./data/users.json`,`utf-8`)).map(el =>{
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
     })

     return queryInterface.bulkInsert(`Users`, insertData, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete(`Users`, null)
  }
};
