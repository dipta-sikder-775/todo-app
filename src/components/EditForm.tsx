import { useEffect, useRef, useState } from "react";

interface IEditFormProps {
  todoText: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, text: string) => void;
}

const EditForm = ({ todoText, handleSubmit }: IEditFormProps) => {
  const [text, setText] = useState(todoText || "");
  const focusInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focusInput.current) {
      focusInput.current.focus();
    }
  }, [focusInput]);

  return (
    <form onSubmit={(e) => handleSubmit?.(e, text)}>
      <input
        ref={focusInput}
        type="text"
        className="w-full focus:bg-transparent focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
};

export default EditForm;
