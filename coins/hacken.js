/**
 * @title Hacken
 * @symbol HKN
 * @ethContractAddr 0x9e6b2b11542f2bc52f3029077ace37e8fd838d7f
 * @implementation Dynamic
 * @cmcId hacken
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x9e6b2b11542f2bc52f3029077ace37e8fd838d7f?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -8)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
