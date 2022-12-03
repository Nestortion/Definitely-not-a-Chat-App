import './custom-image.scss'

export default function CustomImage({ src, alt, onClick }) {
  return (
    <>
      <div className="custom-image__container" onClick={onClick}>
        <img className="custom-image" src={src} alt={alt} />
      </div>
    </>
  )
}
