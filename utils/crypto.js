const crypto = require('crypto');
const {invalidQuery} = require('../errors/errors')

// const algorithm = process.env.CRYPTO_ALGORITHM // Undefined- Why?
// const secretKey = process.env.CRYPTO_SECRET_KEY // Undefined- Why?

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
const iv = crypto.randomBytes(16);


const encrypt = (text) => {
    if (!iv) {
        throw new invalidQuery('iv', 'content')
    }
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('base64'),
        content: encrypted.toString('base64')
    };
};

const decrypt = (hash) => {
    if (!hash || !hash.iv) {
        throw new invalidQuery()
    }
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'base64'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()]);

    return decrypted.toString();
};

module.exports = {
    encrypt,
    decrypt
}
