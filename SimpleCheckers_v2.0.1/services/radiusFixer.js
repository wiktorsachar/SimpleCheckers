const radiusFixer = (x, y) => {
  let style = {};
  const radius = 5;
  if (x === 0 && y === 0) {
    style.borderTopLeftRadius = radius;
  }
  if (x === 7 && y === 0) {
    style.borderTopRightRadius = radius;
  }
  if (x === 0 && y === 7) {
    style.borderBottomLeftRadius = radius;
  }
  if (x === 7 && y === 7) {
    style.borderBottomRightRadius = radius;
  }
  return style;
};

export default radiusFixer;