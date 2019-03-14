const readline = require('readline-sync');

const robots = {
  text: require('./robots/text.js')
}

const app = {
    content : {},

    start : async() => {
        console.log("......... Starting");
        app.content.searchTerm = app.askAndReturnSearchTerm();
        app.content.prefix = app.askAndReturnPrefix();
        await robots.text.run(app.content);
        console.log("......... Finished");
    },
    askAndReturnSearchTerm : ()=>{
        console.log("......... Asking and Return Search Term");    
        // return readline.question('Type a Wikipedia search term: ');
        return "Michael Jackson";
    },
    askAndReturnPrefix : ()=>{
        console.log("......... Asking and Return Prefix");    
        const prefixes = ['Who is', 'What is', 'The history of'];
        // const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ');
        const selectedPrefixIndex = 0;
        const selectedPrefixText = prefixes[selectedPrefixIndex];
        return selectedPrefixText; 
    }
}

app.start();