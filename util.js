const crypto = require('crypto');

const verifyGithub = (req) => {
    if (!req.headers['x-hub-signature']) {
        return false;
    }
    // compare their hmac sig to ours
    const theirSig = req.headers['x-hub-signature'];
    const payload = JSON.stringify(req.body);
    const secret = process.env.TOKEN;
    const ourSig = `sha1=${crypto.createHmac('sha1', secret).update(payload).digest('hex')}`;

    try {
        return crypto.timingSafeEqual(Buffer.from(theirSig), Buffer.from(ourSig));
    } catch(e) {
        return false;
    }
}

module.exports = {
    verifyGithub
};
