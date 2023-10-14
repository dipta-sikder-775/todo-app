// use generic parameter to define the type of the function

const debounceFn = <T extends (...args: any) => any>(fn: T, delay: number) => {
  let timer: any = null;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounceFn;
