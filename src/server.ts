import app, { init } from "./app";
import "module-alias/register";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

init().then(() => {
  app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Server is listening on port ${port}`);
  });
});
