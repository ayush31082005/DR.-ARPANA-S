export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 }
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 }
};

export const staggerWrap = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};
