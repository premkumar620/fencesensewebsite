import { createContext, useContext, useMemo, useState } from "react";

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      openEnquiry: () => setOpen(true),
      closeEnquiry: () => setOpen(false),
    }),
    [open],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return context;
}
