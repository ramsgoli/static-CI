const crypto = require('crypto');

const verifyGithub = (req) => {
    
    // compare their hmac sig to ours
    const theirSig = req.headers['X-Hub-Signature'];
    const payload = JSON.stringify(req.body);
    const secret = PROCESS.ENV.TOKEN;
    const ourSig = `sha=${crypto.createHmac('sha1', secret)update(payload).digest('hex')}`;

    return crypto.timingSafeEqual(Buffer.from(theirSig), Buffer.from(ourSig));
}

export {
    verifyGithub
};
