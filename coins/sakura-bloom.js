/**
 * @title Sakura Bloom
 * @symbol SKB
 * @ethContractAddr 0x4af328c52921706dcb739f25786210499169afe6
 * @implementation Dynamic
 * @cmcId sakura-bloom
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x4af328c52921706dcb739f25786210499169afe6?apiKey=freekey', (error, response, body) => {
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
