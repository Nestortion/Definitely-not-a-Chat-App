import { useEffect, useState } from 'react'

function useDebounceValue(value, time) {
  const [debounceValue, setDebounceValue] = useState()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value)
    }, time)

    return () => {
      clearTimeout(timeout)
    }
  }, [time, value])

  return debounceValue
}

export default useDebounceValue
