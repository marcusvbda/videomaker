class App {
    
    constructor() {
        this.robots = {
            text      : require('./robots/text.js'),
            userInput : require('./robots/user-input.js')
        };
        this.content = {}
        this.search  = {}
    }

    async start() {
        console.log("......... Starting")
        this.search = this.robots.userInput.run()
        this.content    = await this.robots.text.run(this.search)
        console.log("......... Finished")
        // console.log(this.content)
    }
    
}

let app = new App()
app.start()