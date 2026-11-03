const express = require('express')
const router = express.Router() // finds what code to run in response to a request
// typically based on url and method

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

router.post('/submit-feedback', function (req, res, next){
    // Access form data
    // Get request reads the url query
    const formData = req.body // For a post request
    console.log(formData)

    // todo - save to a database
    // automatically email someone when feedback is submitted

    res.render('thank_you', {
        name: formData.name,
        email: formData.email,
        comments: formData.comments,
        currentStudent: formData['current-student']
    })
})




module.exports = router  // Keep this the last line of the file