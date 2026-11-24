const { GoogleGenAI, Type } = require('@google/genai')
const departments = require('./departments.json')
const departmentsString = JSON.stringify(departments)
const config = require('./config')

const genAI = new GoogleGenAI( {GEMINI_API_KEY: config.GEMINI_API_KEY} )

// Try the request again if Google is overloaded (503), waiting a bit longer each time
async function generateWithRetry(request, tries = 3) {
    for (let attempt = 1; attempt <= tries; attempt++) {
        try {
            return await genAI.models.generateContent(request)
        } catch (error) {
            // Give up on other errors, or when we're out of tries
            if (error.status !== 503 || attempt === tries) {
                throw error
            }
            await new Promise(resolve => setTimeout(resolve, 2000 * attempt))
        }
    }
}

module.exports = (feedbackComments) => {

    // ask LLM to return an array of matching departments for feedbackComments

    const prompt = `${config.promptInstruction}
    Feedback comments: ${feedbackComments}
    Department choices: ${departmentsString}`

    return generateWithRetry({
        model: config.model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING,
                }
            }
        }
    }).then ( response  => {
        return JSON.parse(response.text)
    })
}

//sorter('How to make an appointment with an advisor?').then( response => {console.log(response)})