import { useState } from 'react'
import Button from '../../UI/Button/Button'
import './search-in-chat.scss'

export default function SearchInChat({ closeModal }) {
  const [searchWord, setSearchWord] = useState('')

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchWord) return
    console.log(searchWord)
    closeModal()
  }

  const handleReset = () => {
    setSearchWord('')
  }

  return (
    <div className="search-chat">
      <form onSubmit={handleSubmit} className="search-chat__form">
        <label htmlFor="search-chat">Words to Search:</label>
        <input
          type="text"
          value={searchWord}
          onChange={handleChange}
          id="search-chat"
        />
        <div className="button-group">
          <Button>Search</Button>
          <Button onClick={handleReset} secondary type="button">
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}
