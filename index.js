const readline = require('readline-sync')

class App {
    
    constructor() {
        this.robots = {
            text : require('./robots/text.js')
        };
        this.content    = {}
        this.searchTerm = null
        this.prefix     = []
    }

    async start() {
        console.log("......... Starting")
        this.searchTerm = this.askAndReturnSearchTerm()
        this.prefix     = this.askAndReturnPrefix()
        this.content  = await this.robots.text.run(this.searchTerm)
        console.log("......... Finished")
        console.log(this.content);
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
}

let app = new App()
app.start()