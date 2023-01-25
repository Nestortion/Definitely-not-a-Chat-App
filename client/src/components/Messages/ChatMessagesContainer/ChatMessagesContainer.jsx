import {
  ChatAddedDocument,
  useCurrentUserQuery,
  useUserChatsQuery,
} from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ChatMessages from '../ChatMessages/ChatMessages'
import './chat-messages-container.scss'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { searchInput, isSearching } from '../../../App'
import Button from '../../UI/Button/Button'

export default function ChatMessagesContainer() {
  const chatsQuery = useUserChatsQuery()

  const [searchWord, setSearchWord] = useAtom(searchInput) // string from search word component
  const [userIsSearching, setUserIsSearching] = useAtom(isSearching)

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  useEffect(() => {
    chatsQuery.subscribeToMore({
      document: ChatAddedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        let previousChats = prev.userChats
        return {
          userChats: [...previousChats, subscriptionData.data.chatAdded],
        }
      },
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchWord || searchWord === '') return

    console.log(searchWord)

    setUserIsSearching(false)
  }

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Error</ErrorText>
  if (chatsQuery.loading) return <LoadingSpinner />
  if (chatsQuery.error) return <ErrorText>Error</ErrorText>

  return (
    <div className="chat-messages-container">
      {userIsSearching && (
        <div className="chat-messages__search-input">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search words"
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <Button green>Search</Button>
          </form>
        </div>
      )}
      <ChatMessages user={user} userChats={chatsQuery} />
    </div>
  )
}
