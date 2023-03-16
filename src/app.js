import initEnvironment from "./loaders/index.js";
import server from "./loaders/express.js";

async function startServer() {
  const port = 3000;

  await initEnvironment();

  server.listen(port, () => {
    console.log(`Server is ready and listening on port ${port}`);
  });
}

startServer();
