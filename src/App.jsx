
import { InputText } from "./components/form/input.jsx"
import { useEffect, useId, useReducer, useState } from "react"
import { Todo } from "./components/todo.jsx"
import { createPortal } from "react-dom"

const actions = {
    create:'CREATE',
    update:'UPDATE',
    delete:'DELETE',
    delete_all:'DELETE_ALL',
    finish:'FINISH',
    do:'DO',
    todo:'TODO',
    all:'All',
    search:'SEARCH',
}

const initialState = {
    do:false,
    todo:false,
    all:true,
    search:'',
    todos:[
        {
            id:1,
            name:'clone the repository',
            state:true
        },
        {
            id:2,
            name:'add new functionality',
            state:false
        },
        {
            id:3,
            name:'follow me on Github',
            state:false
        },
    ]
};

function reduce(state, action){
    if (action.type == actions.delete){
        return {
            ...state,
            todos:state.todos.filter(todo => todo !== action.payload)
        }
    }

    else if (action.type == actions.delete_all){
        return {
            ...state,
            todos:[]
        }
    }

    else if (action.type == actions.create){
        const todo = {
            id: state.todos.length + 1,
            name: action.payload,
            state: false
        }
        state.todos.push(todo)
        
        
        return {
            ...state
        }
    }

    else if (action.type == actions.finish){
        return {
            ...state,
            todos:state.todos.map(todo => todo === action.payload ? {
                ...todo,
            state:!todo.state} : todo)
        }
    }

    else if (action.type == actions.do){
        return {
            ...state,
            do:true,
            todo:false,
            all:false,
        }
    }
    
    else if (action.type == actions.todo){
        return {
            ...state,
            do:false,
            todo:true,
            all:false,
        }        
    }

    else if (action.type == actions.all){
        return {
            ...state,
            do:false,
            todo:false,
            all:true,
        }        
    }

    else if (action.type == actions.search){
        return {
            ...state,
            search:action.payload
        }
    }
}

function App() {
    const [state, dispatch] = useReducer(reduce, initialState)
    const [stateAdd, setAdd] = useState(false)
    return <>
        <Inp dispatch={dispatch}/>
        <ShowAction create={() => setAdd(!stateAdd)}
            dos={() => dispatch({type:actions.do})}
            todo={() => dispatch({type:actions.todo})}
            all={() => dispatch({type:actions.all})}
            deletes={() => dispatch({type:actions.delete_all})}
        />
        <TodoListShow state={state} dispatch={dispatch} />

        {stateAdd &&  <CreateStain  dispatch={dispatch} state={() => setAdd(!stateAdd)} />}
       
  </>
}

function TodoListShow({state,dispatch}) {
    const id = useId()
    console.log(state);
        
    
    return <>
        <h3 className="font-bold text-2xl capitalize">my stains</h3>
        
        <div className="space-y-2">
            {(state.todos && !state.search) && state.todos.map((todo => {
                if (state.do && todo.state) return (
                    <Todo key={todo.id} todo={todo} finish={actions.finish} deletes={actions.delete} dispatch={dispatch} />
                )
                else if (state.todo && !todo.state) return (
                    <Todo key={todo.id} todo={todo} finish={actions.finish} deletes={actions.delete} dispatch={dispatch} />
                )
                
                else if (state.all) return (
                    <Todo key={todo.id} todo={todo} finish={actions.finish} deletes={actions.delete} dispatch={dispatch} />
                )
                
            }))}
            {(state.todos && state.search) && state.todos.map((todo => {
               
                if (state.do && todo.state && todo.name.includes(state.search))
                    return (
                    <Todo key={todo.id} todo={todo} finish={actions.finish} deletes={actions.delete} dispatch={dispatch} />
                )
            
                else if (state.todo && !todo.state && todo.name.includes(state.search)) 
                    return (
                        <Todo key={todo.id} todo={todo} finish={actions.finish} deletes={actions.delete} dispatch={dispatch} />
                    )
                
                else if (state.all && todo.name.includes(state.search))
                    return (
                    <Todo key={todo.id} todo={todo} finish={actions.finish} deletes={actions.delete} dispatch={dispatch} />
                )
                
            }))}
        </div>
    </>
}

function CreateStain({dispatch,state}) {
    
    const [newStain, setStain] = useState('')

    return createPortal(<div className="absolute w-full inset-0 z-20 bg-green-200/50 backdrop-blur-[16px] backdrop-saturate-[100%]">
        <div className="fixed max-w-md bg-[#E9EDEF] p-3 rounded-lg space-y-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all shadow-lg">
            
            <p className="font-bold text-2xl text-[#075E54]">what is your new stain</p>
            
            <InputText placeholder="add new stain"  name='add' value={newStain} setValue={setStain} />
            
            <div className="flex gap-x-1">
                <button className="btn-foncer w-full capitalize"
                    onClick={() => {
                        if (newStain){
                            dispatch({type:actions.create, payload:newStain})
                            setStain('')
                        }
                    }}
                    >add</button>
                <button className="btn-danger w-full capitalize"
                    onClick={state}
                >
                    cancel</button>
            </div>
        </div>
    </div>,document.body)
}

function ShowAction({create, dos, all, todo, deletes}) {
    return <div className="flex gap-2 items-center justify-center">
        <button className="btn-primary capitalize bg-blue-700"
            onClick={create}
        >
            add
        </button>
        <button className="btn-foncer capitalize"
            onClick={all}
        >all</button>
        <button className="btn-clair capitalize bg-[#E9EDEF] text-[#075E54]"
            onClick={todo}
        >todo</button>
        <button className="btn-foncer capitalize"
            onClick={dos}
        >do</button>
        <button className="btn-danger capitalize"
            onClick={deletes}
        >deletes</button>
    </div>
}

function Inp({dispatch}) {
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch({type:actions.search,payload:name})
    }, [name])
    

    return <InputText placeholder="search ..."  name='name' value={name} setValue={setName} />
}

export default App
