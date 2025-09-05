export const OPENAI_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY || "your-api-key-here",
  dangerouslyAllowBrowser: true,
};

export const AI_REQUEST_CONFIG = {
  model: "gpt-4o-mini",
  temperature: 0.7,
  max_tokens: 2000,
};

export const EXAMPLE_QUERIES = [
  "Lightweight laptop for travel",
  "Budget smartphone with good camera",
  "Wireless headphones for workouts",
];

export const ERROR_MESSAGES = {
  EMPTY_QUERY: "Please enter a search query",
  SHORT_QUERY: "Query must be at least 3 characters long",
  API_ERROR:
    "Failed to get recommendations. Please check your API key and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

export const UI_TEXT = {
  APP_TITLE: "Product Advisor",
  APP_SUBTITLE: "Tell us what you need, we'll find the perfect match",
  SEARCH_PLACEHOLDER: "Describe what you're looking for...",
  WELCOME_TITLE: "Ready to find your perfect product?",
  WELCOME_TEXT:
    "Just describe what you're looking for in natural language. For example:",
  EMPTY_STATE_TITLE: "No perfect matches found",
  EMPTY_STATE_TEXT:
    "Try describing your needs differently or be more specific about features that matter to you.",
  REASON_LABEL: "Why this is perfect for you:",
  LOADING_TEXT: "Finding products...",
  SEARCH_BUTTON_DEFAULT: "Find Products",
  SEARCH_BUTTON_AGAIN: "Find Products",
  RESULTS_TITLE: "Best Matches",
  RESULTS_SUBTITLE: "Ranked by how well they fit your needs",
};
