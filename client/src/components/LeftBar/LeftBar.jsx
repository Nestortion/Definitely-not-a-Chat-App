import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
import {
  ChatAddedDocument,
  MemberAddedDocument,
  useGroupsQuery,
  useLatestChatsQuery,
  useSearchGroupsLazyQuery,
} from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import { MdAdd } from 'react-icons/md'
import { useEffect } from 'react'
import SpawnModal from '../UI/Modal/SpawnModal'
import JoinChat from '../JoinChat/JoinChat'

export default function LeftBar({ user, showOnlyMiddle }) {
  const {
    data: latestChats,
    loading: latestLoading,
    error: latestError,
    subscribeToMore,
    refetch: refetchLatestChat,
  } = useLatestChatsQuery()

  const {
    data: chat,
    loading,
    error,
    refetch: refetchGroups,
    subscribeToMore: groupsSubscribeToMore,
  } = useGroupsQuery()
  const [searchGroups] = useSearchGroupsLazyQuery()

  useEffect(() => {
    subscribeToMore({
      document: ChatAddedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const updatedChats = prev.latestChats.map((chat) => {
          if (chat?.receiver === subscriptionData.data.chatAdded.receiver) {
            return subscriptionData.data.chatAdded
          }
          return chat
        })
        refetchLatestChat()
        refetchGroups()

        return {
          latestChats: [...updatedChats],
        }
      },
    })

    groupsSubscribeToMore({
      document: MemberAddedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        console.log(
          subscriptionData.data.memberAdded.blame.id === user.currentUser.id
        )
        if (
          !(subscriptionData.data.memberAdded.blame.id === user.currentUser.id)
        )
          return prev
        if (
          !prev.groups.some(
            (group) => group.id === subscriptionData.data.memberAdded.group.id
          )
        ) {
          refetchLatestChat()

          return {
            groups: [...prev.groups, subscriptionData.data.memberAdded.group],
          }
        }
      },
    })
  }, [])
  const [searchData, setSearchData] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const [isModalShowing, setIsModalShowing] = useState(false)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Something went wrong</ErrorText>
  if (latestLoading) return <LoadingSpinner />
  if (latestError) return <ErrorText>Something went wrong</ErrorText>

  const searchValueHandle = async (e) => {
    if (e.target.value) {
      const searchRes = await searchGroups({
        variables: { groupName: e.target.value },
      })
      setSearchData(searchRes.data)
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const showModal = () => {
    setIsModalShowing(true)
  }

  const closeModal = () => {
    setIsModalShowing(false)
  }

  return (
    <div className="leftbar">
      <div className="top">
        <div className="header">
          <h1>Chats</h1>
          {isModalShowing && (
            <SpawnModal title="Join or Create" closeModal={closeModal}>
              <JoinChat />
            </SpawnModal>
          )}
          <Button onClick={showModal}>
            <MdAdd />
          </Button>
        </div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <Input
              onChange={searchValueHandle}
              type="text"
              placeholder="Search Chats"
            />
          </form>
        </div>
      </div>

      <div className="bottom">
        <ChatList
          chats={isSearching ? searchData.searchGroups : chat.groups}
          latest={latestChats.latestChats}
          showOnlyMiddle={showOnlyMiddle}
        />
      </div>
    </div>
  )
}
