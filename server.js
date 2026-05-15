const { spawn } = require("child_process");

const app = spawn("npm", ["start", "--workspace=apps/web"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    PORT: process.env.PORT || "3000",
  },
});

app.on("close", (code) => {
  process.exit(code);
});
