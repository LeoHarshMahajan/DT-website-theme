module.exports = {
  apps: [
    {
      name: 'dt-website',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/dt-website',
      instances: 'max',   // use all CPU cores
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Auto-restart on crash
      autorestart: true,
      max_memory_restart: '512M',
      // Logging
      error_file: '/var/log/dt-website/error.log',
      out_file: '/var/log/dt-website/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
