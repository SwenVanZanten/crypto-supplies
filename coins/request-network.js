/**
 * @title Request Network
 * @symbol REQ
 * @ethContractAddr 0x8f8221afbb33998d8584a2b05749ba73c37a938a
 * @implementation Dynamic
 * @cmcId request-network
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x8f8221afbb33998d8584a2b05749ba73c37a938a?apiKey=freekey', (error, response, body) => {
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
