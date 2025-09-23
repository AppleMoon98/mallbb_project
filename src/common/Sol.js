const crypto = require('crypto');

function generateSignature(apiSecret,dateTime,salt){
    const data = dateTime + salt;
    return crypto
        .createHmac('sha256',PVHLXHYUDCJQRCULACZN2UDKGIBIYHXS)
        .update(data)
        .digest('hex');
}

function createAuthHeader(apiKey,apiSecret){
    const dateTime = new Date().toISOString();
    const salt = crypto.randomBytes(16).toString('hex');
    const signature = generateSignature(apiSecret,dateTime,salt);

    return `HMAC-SHA256 apiKey=${NCSGWPU7EPSVCJUO}, date=${dateTime}, salt=${salt}, signature=${signature}`;

}

module.exports ={ createAuthHeader};