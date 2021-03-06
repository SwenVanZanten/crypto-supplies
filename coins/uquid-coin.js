/**
 * @title Uquid Coin
 * @symbol UQC
 * @ethContractAddr 0xd01db73e047855efb414e6202098c4be4cd2423b
 * @implementation Dynamic
 * @cmcId uquid-coin
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0xd01db73e047855efb414e6202098c4be4cd2423b?apiKey=freekey', (error, response, body) => {
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
