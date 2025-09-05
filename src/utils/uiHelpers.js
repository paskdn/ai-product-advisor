import { useAlert } from "../context/AlertContext";
import { formatProductDetails } from "./productUtils";

export const showErrorAlert = (title, message, showAlertRef) => {
  if (showAlertRef) return showAlertRef(title, message);
  try {
    const { showAlert } = useAlert();
    showAlert(title, message);
  } catch (e) {}
};

export const showProductDetails = (product, showAlertRef) => {
  const formatted = formatProductDetails(product);
  if (showAlertRef)
    return showAlertRef(product.product_name, formatted, [{ text: "OK" }]);
  try {
    const { showAlert } = useAlert();
    showAlert(product.product_name, formatted, [{ text: "OK" }]);
  } catch (e) {}
};

export const createLoadingConfig = (isLoading, text = "Loading...") => ({
  isLoading,
  text,
});

export const getLoadingStyle = (isLoading, style, loadingStyle) => {
  return [style, isLoading && loadingStyle];
};
