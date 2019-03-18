const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

class watsonNlu {
    
    constructor() {
        this.watsonApiKey = require('../credentials/watson-nlu.json').apikey
        this.nlu = new NaturalLanguageUnderstandingV1({
          iam_apikey: this.watsonApiKey,
          version: '2018-04-05',
          url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
        })
        this.content = {}
    }

    async run(content) {
        console.log("......... Running Watson Natural Language Robot")
        this.content = content
        await this.fetchKeywordsOfAllSentences()
        return this.content;
    }

    async fetchKeywordsOfAllSentences() {
        console.log("......... Fetching Words of all sentences")  
        for (let sentence of this.content.sentences) {
            sentence.keywords = await this.fetchWatsonAndReturnKeywords(sentence.text)
        }
    }

    async fetchWatsonAndReturnKeywords(sentence) {
        return new Promise((resolve, reject) => {
            this.nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, 
            (error, response) => {
                if (error) {
                    throw error
                }
                let keywords = response.keywords;
                resolve(keywords)
          })
        })
    }

}


let robot = new watsonNlu()
module.exports = robot
