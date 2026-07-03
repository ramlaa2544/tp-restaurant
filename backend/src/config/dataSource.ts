import dotenv from "dotenv";
dotenv.config();

export function isMock(): boolean {
  return process.env.DATA_SOURCE === "mock";
}