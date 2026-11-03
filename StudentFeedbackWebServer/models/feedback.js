// define the feedback model - define the table in the database,
// and defines the structure of the feedback objects in the code

const { DataTypes } = require("sequelize")

module.exports = (sequelizeDatabase) => {

    const Feedback = sequelizeDatabase.define(
        "Feedback", // name of the table
        {       // An object that defines the columns in the table
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            comments: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isCurrentStudent: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                get() {
                        // if the database stores false, return 'no', if it stores true, return 'yes'
                    if (this.getDataValue()) {
                        return 'yes'
                    } else {
                        return 'no'
                    }
                },
                set(newValue){
                    // convert 'yes' to true and 'no' to false to store in the database
                    if (newValue === 'yes') {
                        this.setDataValue('isCurrentStudent', true)
                    } else { // the value is no
                        this.setDataValue('isCurrentStudent', false)
                    }

                    }
            },
            departments: {
                type: DataTypes.JSON,
                allowNull: true,
                defaultValue: []
            }

            //Sequelize will create an ID and createdAt column by default

        }
    )

    Feedback.sync({ force: false }).then(() => console.log("Create Feedback table"))

    return Feedback // index.js needs the model back
}