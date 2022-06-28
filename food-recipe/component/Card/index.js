import Image from 'next/image'
import style from './Card.module.css'
import dummy from '../../public/assets/image/1471262.png'

const Card = (image, title) => {
  return (
    <div className={style.Card}>
    <Image className={style.image} src={image} alt='thumbnail' layout="responsive"/>
    <p>{'title'}</p>
    </div>
  )
}

export default Card