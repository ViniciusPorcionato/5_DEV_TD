import { motion } from "framer-motion";

export const ButtonLogin = (props) => {
  return (
    <motion.button
      whileTap={{ scale: 1.05 }}
      className="bg-primary h-[66px] w-[556px] flex items-center justify-center rounded-[10px] text-[#000000] text-[30px] active:bg-[#FFFFFF]"
    >
      {props.children}
    </motion.button>
  );
};

export const ButtonPost = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type="submit"
      className="bg-primary h-[30px] w-[150px] rounded-[5px] text-background text-[#000000] text-[15px] active:bg-[#FFFFFF] active:bg-primary/90"
    >
      {props.children}
    </button>
  );
};

export const ButtonDeleteConfirm = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      type="submit"
      className="bg-primary h-[30px] w-[150px] rounded-[5px] text-background text-[#000000] text-[15px] active:bg-[#FFFFFF] active:bg-primary/90"
    >
      {props.children}
    </button>
  );
};
