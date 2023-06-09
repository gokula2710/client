import { useEffect, useState } from "react"
import { useEquipmentsContext } from "../hooks/useEquipmentContext"
import { useAuthContext } from "../hooks/useAuthContext"

const EquipmentForm = () => {
    const { dispatch } = useEquipmentsContext()
    const { user } = useAuthContext()
    const [id, setID] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [processor, setProcessor] = useState('')
    const [ram, setRam] = useState('')
    const [hdd, setHDD] = useState('')
    const [brand, setBrand] = useState('')
    const [dop, setDOP] = useState('')
    const [warranty, setWarranty] = useState('')
    const [condition, setCondition] = useState('Working')
    const [location, setLocation] = useState('')
    const [labs, setLabs] = useState([])
    const [lab, setLab] = useState('')
    const [error, setError] = useState(null)
    useEffect(() => {
        const getLab = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/labs`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                setLabs(json)
                if (json[0]){
                    setLab(json[0].code)
                }
            }
        }
        getLab()
    }, [user.token])


    const handleSumbit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError("Authorization Required")
            return
        }
        const equipment = { id, name, type, processor, ram, hdd, brand, dop, warranty, condition, location, lab }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/api/equipments`, {
            method: 'POST',
            body: JSON.stringify(equipment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setID('')
            setType('')
            setBrand('')
            setDOP('')
            setWarranty('')
            setCondition(condition)
            setLocation('')
            setLab(lab)
            setProcessor('')
            setRam('')
            setHDD('')
            setError(null)
            console.log("Add Successful")
            dispatch({ type: 'CREATE_EQP', payload: json })
        }
    }
    return (
        <div className="workout-form">
            <form className="create" onSubmit={handleSumbit}>
                <h3>Add New Equipment</h3>
                <label>Equipment Name:</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                <label>ID</label>
                <input type="text" required value={id} onChange={(e) => setID(e.target.value)} />
                <label>Brand</label>
                <input type="text" required value={brand} onChange={(e) => setBrand(e.target.value)} />
                <label>Type:</label>
                <input type="text" required value={type} onChange={(e) => setType(e.target.value)} />
                <label>Processor</label>
                <input type="text" value={processor} onChange={(e) => setProcessor(e.target.value)} />
                <label>RAM</label>
                <input type="text" value={ram} onChange={(e) => setRam(e.target.value)} />
                <label>HDD</label>
                <input type="text" value={hdd} onChange={(e) => setHDD(e.target.value)} />
                <label>Purchase</label>
                <input type="date" required value={dop} onChange={(e) => setDOP(e.target.value)} />
                <label>Warranty</label>
                <input type="date" required value={warranty} onChange={(e) => setWarranty(e.target.value)} />
                <label>Condition</label>
                <select  onChange={(e) => setCondition(e.target.value)}>
                    <option value="Working">Working</option>
                    <option value="Not Working">Not Working</option>
                    <option value="Under Repair">Under Repair</option>
                    <option value="Unavailable">Unavailable</option>
                </select>
                <label>Lab</label>
                <select  onChange={(e) => setLab(e.target.value)}>
                    {labs.map((labt) => (
                        <option key={labt._id} value={labt.code}>{labt.name}</option>
                    ))}
                </select>
                <button>Add Equipment</button>
                {error && <div className="error"><p>{error}</p>
                </div>}
            </form>
        </div>
    )
}
export default EquipmentForm;