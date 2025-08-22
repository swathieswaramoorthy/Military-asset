import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "transactions.log");

const logger = async (userId, message) => {
  const log = `${new Date().toISOString()} | User: ${userId} | ${message}\n`;
  fs.appendFileSync(logFile, log);
};

export default logger;
