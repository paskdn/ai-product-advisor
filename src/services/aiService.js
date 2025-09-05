import OpenAI from "openai";
import {
  OPENAI_CONFIG,
  AI_REQUEST_CONFIG,
  SYSTEM_MESSAGE,
  RESPONSE_SCHEMA,
} from "../utils/constants";

const openai = new OpenAI(OPENAI_CONFIG);

const formatCatalogForPrompt = (catalog) => {
  return JSON.stringify(catalog, null, 2);
};

export const generatePrompt = (userQuery, catalog) => {
  const catalogText = formatCatalogForPrompt(catalog);

  return `You are an AI Product Advisor. A user is looking for products and has described their needs. Recommend the most suitable products from the catalog.

STRICT RULES:
- Only use products EXACTLY as they appear (brand + product_name must match)
- If fewer than 3 solid matches, return only the valid ones (do NOT fabricate)
- Maximum 5 recommendations
- Output ONLY valid JSON (no markdown fences, no extra commentary)
- Follow the provided JSON schema strictly

WEIGHTING (for relevance reasoning & confidence scoring):
- Feature & capability alignment: 50%
- Use-case / scenario fit: 30%
- Price appropriateness vs implied budget / value: 20%

Include in each reason a concise justification referencing specific features or attributes (brand reputation only if meaningful).

FEW-SHOT EXAMPLE (for style only):
User Query Example: "Need affordable wireless headphones for gym workouts, sweat resistant, decent bass"
Expected JSON snippet (truncated): {
  "recommendations": [
    {
      "product_name": "Bass Headphones",
      "brand": "LEAF",
      "reason": "Wireless over-ear design suitable for workouts, strong bass profile, price is budget-friendly.",
      "confidence_score": 0.78
    }
  ],
  "summary": "User prioritizes wireless, workout suitability (sweat resistance), bass, and budget pricing.",
  "search_context": "Interpreted needs: fitness usage, durability, bass emphasis, cost sensitivity"
}

Now process the actual user request.

Actual User Query: "${userQuery}"

Available Products Catalog (JSON):
${catalogText}
`;
};

export const getProductRecommendations = async (query, catalog) => {
  const prompt = generatePrompt(query, catalog);

  const response = await openai.chat.completions.create({
    ...AI_REQUEST_CONFIG,
    messages: [
      {
        role: "system",
        content: SYSTEM_MESSAGE,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: RESPONSE_SCHEMA,
  });

  return JSON.parse(response.choices[0].message.content);
};
