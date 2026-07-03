export function isMock(): boolean {
  return process.env.DATA_SOURCE === "mock";
}