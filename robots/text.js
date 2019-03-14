
const robot = {
    algorithmia : require('algorithmia'),
    algorithmiaApiKey : require('../credentials/algorithmia.json').apiKey,
    sentenceBoundaryDetection : require('sbd'),

    run : async(content) => {
        console.log("......... Running Text Robot");
        await robot.fetchContentFromWikipedia(content);
        robot.sanitizeContent(content)
        robot.breakContentIntoSentences(content);
    },
    fetchContentFromWikipedia : async (content) => {
        console.log("......... Fetching Content from wikipedia");
        const algorithmiaAuthenticated = robot.algorithmia(robot.algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();
        content.sourceContentOriginal = wikipediaContent.content;
    },
    sanitizeContent : (content) => {
        console.log("......... Sanitizing Content");
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal);
        const withoutDatesInParentheses = robot.removeDatesInParentheses(withoutBlankLinesAndMarkdown);
        content.sourceContentSanitized = withoutDatesInParentheses;
        function removeBlankLinesAndMarkdown(text) {
            console.log("......... Removing blank lines and Markdown");            
            const allLines = text.split('\n')
            const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false;
                }
                return true;
            });
            return withoutBlankLinesAndMarkdown.join(' ');
        }
    },
    removeDatesInParentheses : (text) => {
        return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ');
    },
    breakContentIntoSentences : (content) => {
        console.log("......... Breaking Content Into Sentences");            
        content.sentences = [];
        const sentences = robot.sentenceBoundaryDetection.sentences(content.sourceContentSanitized);
        sentences.forEach((sentence) => {
          content.sentences.push({
            text: sentence,
            keywords: [],
            images: []
          });
        });
    }
}

module.exports = robot;