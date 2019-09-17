module.exports = {
  apps: [
    {
      name: 'server',
      script: './server.js',
      exec_interpreter: './node_modules/babel-cli/bin/babel-node.js',
      exec_mode: 'fork',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
