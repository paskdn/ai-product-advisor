export {
  formatPrice,
  formatPriceLocale,
  getConfidenceColor,
  formatConfidencePercentage,
  generateProductKey,
} from "./formatters";

export { validateSearchQuery, isEmpty } from "./validation";

export {
  findProductInCatalog,
  processRecommendations,
  formatCatalogForPrompt,
  formatProductDetails,
} from "./productUtils";

export {
  OPENAI_CONFIG,
  AI_REQUEST_CONFIG,
  SYSTEM_MESSAGE,
  RESPONSE_SCHEMA,
  EXAMPLE_QUERIES,
  ERROR_MESSAGES,
  UI_TEXT,
} from "./constants";

export {
  showErrorAlert,
  showProductDetails,
  createLoadingConfig,
  getLoadingStyle,
} from "./uiHelpers";
