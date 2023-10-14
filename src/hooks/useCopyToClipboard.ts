import { useEffect, useRef, useState } from "react";

type CopyFn = (text: string) => Promise<boolean>;
type CopiedValue = string | undefined;

interface IUseCopyToClipboardReturn {
  copy: CopyFn;
  isCopied: boolean;
  copiedText: string | undefined;
}

export const useCopyToClipboard = (): IUseCopyToClipboardReturn => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<CopiedValue>();
  const timeoutRef = useRef<number | undefined>();

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setIsCopied(false);
      setCopiedText(undefined);
      return false;
    } finally {
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef?.current);
    };
  }, []);

  return { copy, isCopied, copiedText };
};
