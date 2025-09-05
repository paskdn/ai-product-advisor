import React, { createContext, useContext, useState, useCallback } from "react";
import { DarkAlert } from "../components/DarkAlert";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [state, setState] = useState({
    visible: false,
    title: "",
    message: "",
    actions: [],
  });

  const hideAlert = useCallback(() => {
    setState((s) => ({ ...s, visible: false }));
  }, []);

  const showAlert = useCallback((title, message, actions) => {
    setState({
      visible: true,
      title: title || "",
      message: message || "",
      actions: (actions && actions.length ? actions : [{ text: "OK" }]).map(
        (a) => ({
          text: a.text || "OK",
          onPress: a.onPress,
          tone: a.tone || (a.style === "destructive" ? "destructive" : a.tone),
        }),
      ),
    });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <DarkAlert
        visible={state.visible}
        title={state.title}
        message={state.message}
        actions={state.actions}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
};
