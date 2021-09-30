import React, { useEffect, useState } from 'react'


// get local Data

const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if (lists) {
        return JSON.parse(lists)
    } else {
        return []
    }
}


const Todo = () => {
    const [inputValue, setInputValue] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItems, setIsEditItems] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // Add Items 

    const addItems = () => {
        if (!inputValue) {
            alert('There is no input value...')
        } else if (inputValue && toggleButton) {
            setItems(
                items.map((curEle) => {
                    if (curEle.id === isEditItems) {
                        return { ...curEle, name: inputValue }

                    }
                    return curEle
                })
            )
            setInputValue([])
            setIsEditItems(null)
            setToggleButton(false)

        }
        else {
            const newInputValue = {
                id: new Date().getTime().toString(),
                name: inputValue,
            }

            setItems([...items, newInputValue])
            setInputValue('')
        }
    }

    // Update Items 
    const updateItems = (id) => {
        const item_todo_edited = items.find((curEle) => (
            curEle.id === id
        ))
        setInputValue(item_todo_edited.name)
        setIsEditItems(id)
        setToggleButton(true)

    }

    // Delete Items 

    const deleteItems = (id) => {
        const newList = items.filter((curEle) => (
            curEle.id !== id
        ))
        setItems(newList)
    }

    // Delete All Items 

    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem('mytodolist', JSON.stringify(items))
    }, [items])

    return (
        <div className="todoApp">
            <h2 className="heading">What's the Plan for Today?</h2>

            <div className="addItems">
                <input onChange={(e) => setInputValue(e.target.value)} type="text" value={inputValue} placeholder="Add Task..." />
                {
                    toggleButton ? (<i onClick={addItems} className="fas fa-edit"></i>)
                        : (<i onClick={addItems} className="fas fa-plus"></i>)
                }
            </div>

            <div className="showItems">
                {
                    items?.map((curEle, i) => (
                        <div key={i} className="eachItems">
                            <h3>{curEle.name}</h3>
                            <div className="todo_btn">
                                <i onClick={() => updateItems(curEle.id)} className="fas fa-edit ubtn"></i>
                                <i onClick={() => deleteItems(curEle.id)} className="fas fa-trash-alt dbtn"></i>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className="removeAllbtn">
                <button onClick={removeAll}>Remove All</button>
            </div>

        </div>
    )
}

export default Todo
