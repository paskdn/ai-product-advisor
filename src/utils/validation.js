import { ERROR_MESSAGES } from "./constants";

export const validateSearchQuery = (query) => {
  const trimmedQuery = query?.trim();

  if (!trimmedQuery) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.EMPTY_QUERY,
    };
  }

  if (trimmedQuery.length < 3) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.SHORT_QUERY,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

export const isEmpty = (str) => {
  return !str || !str.trim();
};
