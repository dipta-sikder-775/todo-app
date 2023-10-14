import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import { TiClipboard, TiInputChecked } from "react-icons/ti";

interface ICopyToClipBoardProps {
  copyText: string;
}

const CopyToClipBoard = ({ copyText }: ICopyToClipBoardProps) => {
  const { copy, isCopied } = useCopyToClipboard();

  const handleClickToCopy = () => {
    copy(copyText);
  };

  return (
    <button onClick={handleClickToCopy}>
      <span>
        {isCopied ? (
          <TiInputChecked className="h-5 w-5 text-green-600" />
        ) : (
          <TiClipboard title="click to copy" className="h-5 w-5" />
        )}
      </span>
    </button>
  );
};

export default CopyToClipBoard;
