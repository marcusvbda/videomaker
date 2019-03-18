const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

class text {
    
    constructor() {
        this.algorithmia       = require('algorithmia')
        this.algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
        this.robots = {
            watsonNlu  : require('./watson-nlu'),
        };
        this.sentenceBoundaryDetection = require('sbd')
        this.content = {
            sourceContentOriginal  : null,
            sourceContentSanitized : null,
            sentences              : [],
            maximumSentences       : 7
        };
        this.search = null;
    }

    async run(search) {
        console.log("......... Running Text Robot")
        this.search = search;
        await this.fetchContentFromWikipedia()
        this.sanitizeContent()
        this.breakContentIntoSentences()
        this.limitMaximumSentences()
        this.content = await this.robots.watsonNlu.run(this.content)
        return this.content;
    }

    async fetchContentFromWikipedia() {
        console.log("......... Fetching Content from wikipedia")
        let algorithmiaAuthenticated       = this.algorithmia(this.algorithmiaApiKey);
        let wikipediaAlgorithm             = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        let wikipediaResponse = await wikipediaAlgorithm.pipe({
            "lang" : this.search.lang,
            "articleName": this.search.searchTerm
        })
        let wikipediaContent               = wikipediaResponse.get()
        this.content.sourceContentOriginal = wikipediaContent.content
    }

    sanitizeContent() {
        console.log("......... Sanitizing Content")
        let withoutBlankLinesAndMarkdown     = removeBlankLinesAndMarkdown(this.content.sourceContentOriginal)
        let withoutDatesInParentheses        = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
        this.content.sourceContentSanitized  = withoutDatesInParentheses;

        function removeBlankLinesAndMarkdown(text) {
            console.log("......... Removing blank lines and Markdown")          
            let allLines = text.split('\n')
            let withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMarkdown.join(' ')
        }

        function removeDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }
    }

    breakContentIntoSentences() {
        console.log("......... Breaking Content Into Sentences")          
        let sentences = this.sentenceBoundaryDetection.sentences(this.content.sourceContentSanitized)
        sentences.forEach((sentence) => {
          this.content.sentences.push({
            text: sentence,
            keywords: [],
            images: []
          })
        })
    }

    limitMaximumSentences() {
        console.log("......... Limiting Maximum Sentences")          
        this.content.sentences = this.content.sentences.slice(0, this.content.maximumSentences)
    }    

}


let robot = new text()
module.exports = robot
