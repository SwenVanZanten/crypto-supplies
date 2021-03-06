/**
 * @title Ruff
 * @symbol RUFF
 * @ethContractAddr 0xf278c1ca969095ffddded020290cf8b5c424ace2
 * @implementation Dynamic
 * @cmcId ruff
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xf278c1ca969095ffddded020290cf8b5c424ace2?apiKey=freekey', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);

        if (typeof body.price === 'undefined' || body.price === false || typeof body.price.availableSupply === 'undefined' || body.price.availableSupply === null) {
            return callback(new Error('Not Available'));
        }

        callback({
            c: Number(body.price.availableSupply),
            t: Number(body.totalSupply) * Math.pow(10, -18)
        });
    } else {
        callback(new Error('Request error ' + typeof response !== 'undefined' ? response.statusCode : error));
    }
});
};
