interface IListContainerProps {
  children: React.ReactNode;
}

const ListContainer = ({ children }: IListContainerProps) => {
  return (
    <div className="mt-2 max-h-[300px] overflow-y-auto text-sm text-gray-700">
      {children}
    </div>
  );
};
export default ListContainer;
