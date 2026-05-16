/**
 * PM2 process file for the Channel5 Korea site on EC2.
 *
 *   pm2 start  ecosystem.config.cjs
 *   pm2 reload ecosystem.config.cjs --update-env
 *   pm2 logs   ch5-site
 *   pm2 save   # persist across reboots (combined with pm2 startup)
 */
module.exports = {
  apps: [
    {
      name: "ch5-site",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      // PM2 reads from process.env at start; secrets live in the
      // instance-level .env file (loaded via `pm2 start --env` or by next
      // reading .env via dotenv at runtime).
      env_production: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      error_file: "logs/ch5-site.error.log",
      out_file: "logs/ch5-site.out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
