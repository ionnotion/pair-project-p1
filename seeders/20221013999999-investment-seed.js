'use strict';
const fs = require(`fs`)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     let insertData = JSON.parse(fs.readFileSync(`./data/investments.json`,`utf-8`)).map(el =>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.name = `${el.StockId}-${el.UserId}-${new Date().getTime()}`

      return el
    })

    return queryInterface.bulkInsert(`Investments`, insertData, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete(`Investments`, null)
  }
};
