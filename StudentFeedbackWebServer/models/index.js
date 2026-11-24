// Connection to the database, database configuration
// Provides info on the models we've defined to the rest of the app

const { Sequelize } = require("sequelize")

const config = require("./config");

// const configuration = {
//     storage: 'feedback.sqlite',
//     dialect: 'sqlite'
// }

const env = process.env.NODE_ENV || "development"
const configuration = config[env]

const sequelizeDatabase = new Sequelize(configuration)

const createFeedbackModel = require('./feedback')
const feedbackModel = createFeedbackModel(sequelizeDatabase)

const models = {}
const feedbackModelName = feedbackModel.name

models[feedbackModelName] = feedbackModel // { 'Feedback': the object that represents Feedback }

module.exports = models