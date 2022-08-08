import style from './button.module.css'
const Button = ({type, title, onClick}) => {
  return (
    <button type={type} className={style.submitButt} onClick={onClick} >{title}</button>
  )
}

export default Button