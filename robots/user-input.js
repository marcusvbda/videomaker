const readline = require('readline-sync')

class userInput {
    
    constructor() {
        // 
    }

    run() {
        let searchTerm = this.askAndReturnSearchTerm()
        let prefix     = this.askAndReturnPrefix()
        let lang       = this.askAndReturnLanguage() 
        return {searchTerm:searchTerm,prefix:prefix,lang:lang}
    }

    askAndReturnSearchTerm() {
        console.log("......... Asking and Return Search Term")  
        // return readline.question('Type a Wikipedia search term: ')
        return "Michael Jackson"
    }

    askAndReturnPrefix() {
        console.log("......... Asking and Return Prefix")    
        let prefixes = ['Who is', 'What is', 'The history of']
        // let selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
        let selectedPrefixIndex = 0
        let selectedPrefixText  = prefixes[selectedPrefixIndex]
        return selectedPrefixText
    }

    askAndReturnLanguage() {
        console.log("......... Asking language")    
        let language = ['pt','en']
        // let selectedLangIndex = readline.keyInSelect(language,'Choice Language: ')
        let selectedLangIndex = 0
        let selectedLangText = language[selectedLangIndex]
        return selectedLangText
    }
}


let robot = new userInput()
module.exports = robot
