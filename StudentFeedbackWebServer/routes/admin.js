const express = require('express')
const router = express.Router()

const Feedback = require('../models').Feedback

router.get('/', async function(req, res, next) {

    try {
        const allFeedbacks = await Feedback.findAll()
        res.render('admin', {feedback: allFeedbacks})
    } catch (error) {
        console.error('Error fetching all feedback for the admin page')
        next(error)
    }
        // Feedback.findAll().then( allFeedback => {
        //     console.log(allFeedback)
        //     return res.render('admin', {feedback: allFeedback})
        // })

})

module.exports = router