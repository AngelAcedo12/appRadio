const PROXY_HOST = 'htpp://localhost:4200/';

const PROXY_CONFIG = [
    {
        contet: ['/api'],
        target: PROXY_HOST,
        secure: false
    }
]
module.exports = PROXY_CONFIG