/**
 * @title Couchain
 * @symbol COU
 * @ethContractAddr 0xf091cf09c51811819db705710e9634b8bf18f164
 * @implementation Dynamic
 * @cmcId couchain
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xf091cf09c51811819db705710e9634b8bf18f164?apiKey=freekey', (error, response, body) => {
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
