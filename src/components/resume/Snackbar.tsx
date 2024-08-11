import { createContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SnackbarContextType = {
  open: (text: string) => void;
};

function Snackbar({ message }: any) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`absolute top-2 right-2 ring-1 bg-gray-800 ring-blue-200 p-2 rounded-lg text-sm`}
    >
      <span>{message}</span>
    </motion.div>
  );
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

function SnackbarProvider({ children }: { children: ReactNode}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openSnackbar = (text: string) => {
    setMessage(text);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      setMessage("");
    }, 2000);
  };

  return (
    <SnackbarContext.Provider value={{ open: openSnackbar }}>
      {children}
      <AnimatePresence>
        {open && <Snackbar message={message} />}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
}

export {
  SnackbarContext,
  SnackbarProvider,
};
