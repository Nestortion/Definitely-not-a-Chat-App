import './avatar.scss'

export default function Avatar({ src, alt, size }) {
  return (
    <img className="avatar" src={src} alt={alt} width={size} height={size} />
  )
}
