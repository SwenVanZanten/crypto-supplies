/**
 * @title BLOCKv
 * @symbol VEE
 * @ethContractAddr 0x340d2bde5eb28c1eed91b2f790723e3b160613b7
 * @implementation Dynamic
 * @cmcId blockv
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x340d2bde5eb28c1eed91b2f790723e3b160613b7?apiKey=freekey', (error, response, body) => {
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
