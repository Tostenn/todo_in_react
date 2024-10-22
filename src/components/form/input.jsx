
/**
 * input
 * @param {String} placeholder 
 * @param {String} name 
 * @param {String} value 
 * @param {(s: String) => void} setValue 
 * @returns 
 */
export function InputText({placeholder, type= 'text', name, value, setValue}) {
    return <input 
        type={type}
        className="input w-full"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
}