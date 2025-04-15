
import axios from "axios";

export async function getSORAInsight(topic) {
  const res = await axios.post("https://api.example.com/sora", {
    query: topic,
    intent: "insight"
  });

  const insight = res.data.analysis || "No insight available.";
  return `🔍 SORA Insight: ${insight}`;
}

// Example usage:
// getSORAInsight("gold futures sentiment").then(console.log);
