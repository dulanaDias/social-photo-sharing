import { useState } from "react"
import editIcon from '../assets/pen.png'
import doneIcon from '../assets/tick.png'

export default ({ value, setvalue, isPassword = false }) => {
    const [isEdit, setIsEdit] = useState(false)
    return <div className="row">
        {isEdit ? <input
            value={value}
            type={isPassword ? "password" : "text"}
            onChange={(e) => {
                setvalue(e.target.value)
            }}
            style={{
                border: 'none',
                borderBottom: 'solid 1px black'
            }}
            class="col"
            placeholder="Enter new value"
        />
            : <span className="col">{isPassword ? "passphrase" : value}</span>}
        <div
            className='col-3'
        >
            <img
                src={isEdit ? doneIcon : editIcon}
                style={{
                    height: 20,
                    width: 20
                }}
                onClick={() => { setIsEdit(!isEdit) }}
            />
        </div>

    </div>
}
