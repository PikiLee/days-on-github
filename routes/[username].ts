import { generateImageBufferFromText } from "../utils/generateImageBufferFromText";
import { getDaysOnGithub } from "../utils/getDaysOnGithub";

export default eventHandler(async (event) => {
  const username = getRouterParams(event).username;

  const { daysOnGithub, percentageDaysOnGithub } =
    await getDaysOnGithub(username);
  const message = `${daysOnGithub} (${percentageDaysOnGithub}) days on Github in last 365 days.`;

  const buffer = await generateImageBufferFromText(message);
  console.log("Hello from nitro!");

  setResponseHeader(event, "Content-Type", "image/png");

  return buffer;
});
