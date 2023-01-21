//Triggers when enter key is pressed
export const handleKeypress = (e: { keyCode: number; }, onSubmit: () => void) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };