const winston = require("winston");
const config = require("config");
const http = require("http");

let app = require("../app");

let server = http.createServer(app);

server.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      winston.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT} is already in use`);
      winston.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

const port = process.env.PORT || config.get("port");

server.listen(port, () => {
  console.log(port);
  console.log(`Listening on http://localhost:${port}`);
  winston.info(`Listening on port ${port}...`);
});
