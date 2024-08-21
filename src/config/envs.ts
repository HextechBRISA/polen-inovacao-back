import * as dotenv from "dotenv";
dotenv.config();
import * as dotenvExpand from "dotenv-expand";

export const loadEnv = () => {
  const path = 
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : process.env.NODE_ENV === "development"
        ? ".env.development"
        : ".env";

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
};
