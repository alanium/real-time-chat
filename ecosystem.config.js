module.exports = {
    apps: [
        {
            name: 'chat-websockets',
            script: 'src/server.js',
            instances: 'max',
            exec_mode: 'cluster',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};
