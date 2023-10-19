import { it } from "vitest";
import axios from "axios";

it("should not throw error when calling / endpoint", async () => {
  await axios.get("http://localhost:3000/PikiLee");
});
