type InputProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
};

const Input = (props: InputProps) => {
  const { inputText, setInputText, addTodo } = props;

  return (
    <div className="inputBox">
      <input
        type="text"
        placeholder="請輸入待辦事項"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <a href="#">
        <i className="fa fa-plus" onClick={addTodo}></i>
      </a>
    </div>
  );
};

export default Input;