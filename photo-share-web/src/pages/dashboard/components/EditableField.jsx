import { useEffect, useState } from "react"
import editIcon from '../assets/pen.png'
import doneIcon from '../assets/tick.png'
import cancelIcon from '../assets/cancel.png'

export default ({ value, setvalue, isPassword = false }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [inputValue, setInputValue] = useState("")


    useEffect(() => {
        setInputValue(value)
    }, [value])
    const toggleEditMode = () => {
        if(isEdit) {
            setvalue(inputValue)
        } else if(isPassword) {
            setvalue('')
        }
        setIsEdit(!isEdit)
    }

    const cancelEdit = () => {
        setIsEdit(false)
        setInputValue(value)
    }

    return <div className="row">
        {isEdit ? <input
            value={inputValue}
            type={isPassword ? "password" : "text"}
            onChange={(e) => {
                setInputValue(e.target.value)
            }}
            style={{
                border: 'none',
                borderBottom: 'solid 1px black'
            }}
            class="col"
            placeholder="Enter new value"
        />
            : <span className="col">{isPassword ? "passphrase" : inputValue}</span>}
        <div
            className='col-3'
        >
            {isEdit && <img
                src={cancelIcon}
                style={{
                    height: 20,
                    width: 20
                }}
                onClick={cancelEdit}
            />}
            <img
                src={isEdit ? doneIcon : editIcon}
                style={{
                    height: 20,
                    width: 20
                }}
                onClick={toggleEditMode}
            />
        </div>

    </div>
}
