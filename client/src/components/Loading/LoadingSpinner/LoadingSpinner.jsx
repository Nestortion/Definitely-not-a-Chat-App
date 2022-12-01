import './loading-spinner.scss'
import { MutatingDots } from 'react-loader-spinner'

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <MutatingDots
        height="100"
        width="100"
        color="#67a37d"
        secondaryColor="#67a37d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
      />
    </div>
  )
}
