import Image from 'next/image'
import style from './Card.module.css'
import dummy from '../../public/assets/image/sanshoku dango.jpg'

const Card = (image, title) => {
  return (
    <div className={style.Card}>
    <Image className={style.image} src={dummy} alt='thumbnail' />
    <p>{'title'}</p>
    </div>
  )
}

export default Card