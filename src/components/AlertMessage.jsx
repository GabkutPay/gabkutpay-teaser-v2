import React from "react";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AlertMessage = ({ type = "success", message }) => {
  const baseStyle = "p-3 rounded-md text-sm font-medium shadow-md mt-3";
  const styles = {
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    info: "bg-blue-100 text-blue-800 border border-blue-300",
  };

  if (!message) return null;

  return (
    <motion.div
      className={`${baseStyle} ${styles[type]}`}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      {message}
    </motion.div>
  );
};

export default AlertMessage;
