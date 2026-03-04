module.exports = {
  apps: [
    {
      name: 'unventory-api',
      script: 'dist/main.js',
      instances: 1,
      node_args: '--experimental-global-webcrypto',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 11400,
      },
    },
  ],
};
