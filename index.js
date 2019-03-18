class App {
    
    constructor() {
        this.robots = {
            text      : require('./robots/text'),
            userInput : require('./robots/user-input')
        };
        this.content = {}
        this.search  = {}
    }

    async start() {
        console.log("......... Starting")
        this.search = this.robots.userInput.run()
        this.content    = await this.robots.text.run(this.search)
        console.log("......... Finished")
        console.log(this.content.sentences[0])
    }
    
}

let app = new App()
app.start()