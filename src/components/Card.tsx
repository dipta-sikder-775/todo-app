interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return (
    <div className="mx-auto !mt-5 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      {children}
    </div>
  );
};

export default Card;
