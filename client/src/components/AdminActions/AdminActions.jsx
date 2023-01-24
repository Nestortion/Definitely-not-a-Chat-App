import './admin-actions.scss'
import { MdClose, MdMenu } from 'react-icons/md'

export default function AdminActions({ isOpen, openMenu }) {
  return (
    <div onClick={openMenu} className="admin-actions">
      {isOpen ? (
        <MdClose color="var(--clr-neutral-100" size={36} />
      ) : (
        <MdMenu color="var(--clr-neutral-100" size={36} />
      )}
    </div>
  )
}
