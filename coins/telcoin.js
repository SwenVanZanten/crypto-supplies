/**
 * @title Telcoin
 * @symbol TEL
 * @ethContractAddr 0x85e076361cc813a908ff672f9bad1541474402b2
 * @implementation Dynamic
 * @cmcId telcoin
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x85e076361cc813a908ff672f9bad1541474402b2?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -2)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
