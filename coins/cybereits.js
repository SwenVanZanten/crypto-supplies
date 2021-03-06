/**
 * @title Cybereits
 * @symbol CRE
 * @ethContractAddr 0x61f33Da40594cEc1E3Dc900FaF99F861D01e2e7D
 * @implementation Dynamic
 * @cmcId cybereits
 */

module.exports = (callback, request) => {
request('http://api.ethplorer.io/getTokenInfo/0x61f33Da40594cEc1E3Dc900FaF99F861D01e2e7D?apiKey=freekey', (error, response, body) => {
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
