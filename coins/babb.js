/**
 * @title BABB
 * @symbol BAX
 * @ethContractAddr 0x9a0242b7a33dacbe40edb927834f96eb39f8fbcb
 * @implementation Dynamic
 * @cmcId babb
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x9a0242b7a33dacbe40edb927834f96eb39f8fbcb?apiKey=freekey', (error, response, body) => {
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
