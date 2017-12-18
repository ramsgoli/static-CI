const crypto = require('crypto');

const verifyGithub = (req) => {
    console.log(req.headers);
    if (!req.headers['x-hub-signature']) {
        return false;
    }
    // compare their hmac sig to ours
    const theirSig = req.headers['x-hub-signature'];
    const payload = JSON.stringify(req.body);
    const secret = process.env.TOKEN;
    const ourSig = `sha=${crypto.createHmac('sha1', secret).update(payload).digest('hex')}`;
    console.log(theirSig, ourSig);

    try {
        return crypto.timingSafeEqual(Buffer.from(theirSig), Buffer.from(ourSig));
    } catch(e) {
        return false;
    }
}

module.exports = {
    verifyGithub
};
