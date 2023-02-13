import {
  ChatAddedDocument,
  ChatThreatDetectedDocument,
  ReportsDocument,
  SystemStatsDocument,
  useCurrentUserQuery,
  useUserChatsLazyQuery,
  useUserChatsQuery,
} from '../../../graphql/hooks/graphql'
import ErrorText from '../../Error/ErrorText'
import LoadingSpinner from '../../Loading/LoadingSpinner/LoadingSpinner'
import ChatMessages from '../ChatMessages/ChatMessages'
import './chat-messages-container.scss'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { searchInput, isSearching } from '../../../App'
import Button from '../../UI/Button/Button'
import { MdClose } from 'react-icons/md'
import { useParams } from 'react-router-dom'

export default function ChatMessagesContainer() {
  const [chatsQuery, { data: chatsFetch, subscribeToMore, client }] =
    useUserChatsLazyQuery()

  const { chatId } = useParams()

  const {
    data: chatz,
    loading: chatzLoading,
    error: chatzError,
  } = useUserChatsQuery()

  const [searchWord, setSearchWord] = useAtom(searchInput) // string from search word component
  const [userIsSearching, setUserIsSearching] = useAtom(isSearching)
  const [chats, setChats] = useState()

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  useEffect(() => {
    subscribeToMore({
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

    subscribeToMore({
      document: ChatThreatDetectedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const systemStatsData = client.readQuery({ query: SystemStatsDocument })
        const reportsData = client.readQuery({ query: ReportsDocument })

        let chatThreatIds

        if (reportsData) {
          chatThreatIds = reportsData.reports.chat_with_threat.map(
            (chat) => chat.id
          )

          client.writeQuery({
            query: ReportsDocument,
            data: {
              reports: {
                ...reportsData.reports,
                chat_with_threat: [
                  ...reportsData.reports.chat_with_threat,
                  subscriptionData.data.chatThreatDetected.group,
                ],
              },
            },
          })
        }

        if (systemStatsData) {
          client.writeQuery({
            query: SystemStatsDocument,
            data: {
              systemStats: {
                ...systemStatsData.systemStats,
                pendingReportCount: !chatThreatIds.includes(
                  subscriptionData.data.chatThreatDetected.group.id
                )
                  ? systemStatsData.systemStats.pendingReportCount + 1
                  : systemStatsData.systemStats.pendingReportCount,
              },
            },
          })
        }
      },
    })
  }, [])

  useEffect(() => {
    ;(async function () {
      const chatsRes = await chatsQuery()
      setChats(chatsRes.data.userChats)
    })()
  }, [searchWord])

  useEffect(() => {
    setUserIsSearching(false)
    setSearchWord('')
  }, [chatId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchWord || searchWord === '') return

    if (!userIsSearching) return

    const searchedChats = chatsFetch.userChats.filter((chat) => {
      return chat.message.toLowerCase().includes(searchWord.toLowerCase())
    })

    setChats(searchedChats)
  }

  const handleCloseSearch = () => {
    setUserIsSearching(false)
    setSearchWord('')
    setChats(chatz.userChats)
  }

  if (chatzLoading) return <LoadingSpinner />
  if (chatzError) return <LoadingSpinner />
  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Error</ErrorText>

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
          <Button onClick={handleCloseSearch} secondary>
            <MdClose />
          </Button>
        </div>
      )}
      <ChatMessages
        user={user}
        userChats={userIsSearching ? chats : chatz.userChats}
      />
    </div>
  )
}
