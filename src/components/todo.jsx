import { useId } from "react"


export function Todo({todo, dispatch,finish,deletes}) {
    const style = `flex justify-between ${todo.state ? 'bg-[#075E54]' : 'bg-[#E9EDEF] text-[#075E54]'}  p-3 rounded-lg items-center`
  
    
    return <>
        <div  className={style}>

            <p className="font-bold">{todo.name}</p>
           
           
            <div className="space-x-2">
                {!todo.state && 
                    <button className="btn-foncer capitalize"
                        onClick={() => dispatch({type:finish, payload:todo})}
                    >
                        finish
                    </button>
                }
                <button className="btn-danger capitalize bg-red-700"
                    onClick={() => dispatch({type:deletes, payload:todo})}
                >
                    delete
                </button>
            </div>
        </div> 
    </>
}