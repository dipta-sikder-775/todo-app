
const EditForm = () => {

  return (
    <form onSubmit={(e) => {}}>
      <input
        type="text"
        className="w-full focus:bg-transparent focus:outline-none"
        value={text}
        onChange={(e) => {console.log("e: ", e)}}
      />
    </form>
  );
};

export default EditForm;
