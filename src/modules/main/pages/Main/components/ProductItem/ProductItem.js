import { useNavigate } from 'react-router-dom'
import s from './ProductItem.module.scss'

const ProductItem = (props) => {
  const {id, image, title, price } = props
  const navigate = useNavigate()

  return (
    <div className={s.root} onClick={() => navigate(`/products/${id}`)}>
      <div className={s.containerImage}>
        <img className={s.image} src={image} />
      </div>
      <div className={s.title}>{title}</div>
      <div className={s.prise}>{price} $</div>
    </div>
  )
}

export default ProductItem
