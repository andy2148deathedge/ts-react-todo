import { Todo, Todos } from "../types";
import initData from "../seeds.json";
import { ReactEventHandler, useEffect, useState } from "react";

/* import components */
import Input from "./Input";
import TodosList from "./TodosList";


const initTodos: Todos = initData.initTodos;
enum PageMode {
    All = 'All',
    Done = 'Done',
    Undone = 'Undone'
};
type ActiveArr = string[]; 

const TodosPage = () => {
    const [ inputText, setInputText ] = useState<string>('');
    const [ pageMode, setPageMode ] = useState<PageMode>(PageMode.All);
    const [ activeArr, setActiveArr ] = useState<ActiveArr>([ 'active', '', '']);
    const [ todos, setTodos ] = useState<Todos>(initTodos);
    const [ doneTodos, setDoneTodos ] = useState<Todos>([]);
    const [ unDoneTodos, setUnDoneTodos ] = useState<Todos>([]);
    const [ showTodos, setShowTodos ] = useState<Todos>([]);

    const addTodo = () => {
        const newTodo: Todo = {
            content: inputText,
            isChecked: false
        }
        setTodos((Todos) => [ ...todos, newTodo]);
        setInputText('');
    };

    const chgCheck: ReactEventHandler = (e) => {
        const newTodos = [...todos];
        const index = Number(e.currentTarget.ariaValueNow);
        newTodos[index].isChecked = !newTodos[index].isChecked;
        setTodos(newTodos);
    };

    const removeTodo: ReactEventHandler = (e) => {
        const textContent = e.currentTarget.ariaLabel;
        const newTodos = todos.filter((todo) => todo.content !== textContent);
        setTodos(newTodos);
    };

    const removeDones = () => {
        setTodos(unDoneTodos);
    };

    /* useEffect to shift dones and undones state bt todos & pageMode */
    useEffect(() => {
        const doneTodos = todos.filter((todo) => todo.isChecked === true);
        const unDoneTodos = todos.filter((todo) => todo.isChecked !== true);

        setDoneTodos(doneTodos);
        setUnDoneTodos(unDoneTodos);
        
        if (pageMode === PageMode.Done) {
            setActiveArr([ '', '', 'active' ]);
            setShowTodos(doneTodos);
        } else if (pageMode === PageMode.Undone) {
            setActiveArr([ '', 'active', '' ]);
            setShowTodos(unDoneTodos);
        } else {
            setActiveArr([ 'active', '', '' ]);
            setShowTodos(todos);
        }
    }, [todos, pageMode])

    return (
        <div id="todoListPage" className="bg-half">
            <nav>
                <h1>
                <a href="#">ONLINE TODO LIST</a>
                </h1>
            </nav>
            <div className="conatiner todoListPage vhContainer">
                <div className="todoList_Content">

                    <Input inputText={inputText} setInputText={setInputText} addTodo={addTodo}/>
                
                    <div className="todoList_list">
                        <ul className="todoList_tab">
                            <li>
                                <a href="#" className={activeArr[0]} onClick={() => setPageMode(PageMode.All)} >
                                全部
                                </a>
                            </li>
                            <li>
                                <a href="#" className={activeArr[1]} onClick={() => setPageMode(PageMode.Undone)}>待完成</a>
                            </li>
                            <li>
                                <a href="#" className={activeArr[2]} onClick={() => setPageMode(PageMode.Done)}>已完成</a>
                            </li>
                        </ul>
                        <div className="todoList_items">
                            <TodosList showTodos={showTodos} chgCheck={chgCheck} removeTodo={removeTodo} />

                            <div className="todoList_statistics">
                                <p> {doneTodos.length} 個已完成項目</p>
                                <a href="#" onClick={removeDones}>清除已完成項目</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodosPage;