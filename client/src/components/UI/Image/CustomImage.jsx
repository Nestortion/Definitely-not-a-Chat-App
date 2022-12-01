import './custom-image.scss'

export default function CustomImage({ src, alt }) {
  return (
    <div className="custom-image__container">
      <img className="custom-image" src={src} alt={alt} />
    </div>
  )
}
