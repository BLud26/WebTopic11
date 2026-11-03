const express = require('express')

const databaseModels = require('../models/index') //{ 'Feedback': the object that represents Feedback }

const router = express.Router() // finds what code to run in response to a request
const Feedback = databaseModels.Feedback
const identifyDepartments = require('../services/message_sorter')

// Responds to get request to the home page
router.get('/', function (req, res, next){
    // name of the Handlebars file, name of a template, optional object with data for the template
    res.render('index', {
        title: 'Feedback Application',
        author: 'Ben',
        timePageLoadedAt: new Date()
    })
})


router.get('/feedback-form', function (req, res, next){
    res.render('studentFeedbackForm')
})

router.post('/submit-feedback', async function (req, res, next){
    const formData = req.body
    console.log(formData)
    const comments = formData.comments
    let newFeedback
    let departmentList

    try {
        newFeedback = await Feedback.create(formData)
        res.render('thank_you', {...formData}) // send user the thank you page and keep processing
    } catch (error) {
        console.error(`Error saving feedback  because ${error}`, formData)
        res.locals.message = 'Error saving feedback. Please try again later.'
        return next(error) // send control to the error handler and STOP processing in this function
    }
    try {
        departmentList = await identifyDepartments(formData.comments)
        console.log(`Departments are ${departmentList}`)
    } catch (error) {
        console.error(`Error identifying departments for comments ${comments} because ${error}`)
        return // stop processing in this function
    }   // if this fails, do we tell the user? No, we identify manually.
        // we need to tell the developer

    try {
        await Feedback.update(
            {departments: departmentList},
            {where: {id: newFeedback.id}} // which rows to change - only the row that matches the id
        )
    } catch (error) {
        console.error(`Error updating departments for comments ${comments} departments ${departmentList} because ${error}`)
    }

})

// router.post('/submit-feedback', function (req, res, next){
//     // Access form data
//     // Get request reads the url query
//     const formData = req.body // For a post request
//     console.log(formData)
//
//     // todo - save to a database
//     // automatically email someone when feedback is submitted
//
//     // res.render('thank_you', {
//     //     name: formData.name,
//     //     email: formData.email,
//     //     comments: formData.comments,
//     //     isCurrentStudent: formData.isCurrentStudent
//     // })
//     Feedback.create(formData).then ( (newFeedback) => {
//         res.render('thank_you', { ...formData }) // This code will run if the feedback is saved
//         identifyDepartments(formData.comments).then( departments => {
//             // update the new feedback that was just saved and add the departments
//             Feedback.update(
//                 { departments: departments },
//                 { where: { id: newFeedback.id} } // which rows to change - only the row that matches the id
//             )
//         })
//
//     }) .catch( (error) => {
//         res.locals.message = 'Error saving feedback. Please try again later.'
//         next(error)
//     })
//
//
// })




module.exports = router  // Keep this the last line of the file