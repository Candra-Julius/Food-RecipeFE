import style from './input.module.css'
const InputC = ({name,type,placeholder,label,onChange,min,max,value}) => {
  return (
    <div className={style.input}>
    <label htmlFor={label}>{label}</label>
      <input 
      name={name}
      id={label}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      min={min}
      max={max}
      />
    </div>
  );
};

export default InputC;
