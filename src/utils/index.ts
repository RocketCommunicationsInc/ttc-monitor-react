export const getJulianDay = (date: Date) => {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
};

export const addToast = (
  message: string,
  hideClose: boolean,
  closeAfter: number
) => {
  const toastStack = document.querySelector(
    "rux-toast-stack"
  ) as HTMLRuxToastStackElement;

  toastStack.addToast({
    message: message,
    hideClose: hideClose,
    closeAfter: closeAfter,
  });
};
