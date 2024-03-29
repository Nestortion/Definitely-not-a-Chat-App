import './leftbar.scss'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ChatList from '../ChatList/ChatList'
import { useState } from 'react'
import {
  ChatAddedDocument,
  GroupCreatedDocument,
  MemberAddedDocument,
  MemberRemovedDocument,
  useGroupsQuery,
  useLatestChatsQuery,
} from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import { MdAdd } from 'react-icons/md'
import { useEffect } from 'react'
import SpawnModal from '../UI/Modal/SpawnModal'
import JoinChat from '../JoinChat/JoinChat'
import useDebounceValue from '../../helper_hooks/useDebounceValue'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function LeftBar({ user, showOnlyMiddle }) {
  const {
    data: latestChats,
    loading: latestLoading,
    error: latestError,
    subscribeToMore: latestChatSubscribe,
    refetch: refetchLatestChat,
  } = useLatestChatsQuery()

  const navigate = useNavigate()
  const {
    data: chat,
    loading,
    error,
    refetch: refetchGroups,
    subscribeToMore: groupsSubscribeToMore,
  } = useGroupsQuery()

  const [searchData, setSearchData] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const [isModalShowing, setIsModalShowing] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const debounceValue = useDebounceValue(searchValue, 250)

  const notify = (message) => {
    return toast(message, {
      position: toast.POSITION.TOP_CENTER,
      style: {
        color: 'var(--clr-neutral-100)',
        backgroundColor: 'var(--clr-primary-400)',
        fontSize: 'clamp(0.8rem, 1.3vw, 1.5rem)',
      },
    })
  }

  useEffect(() => {
    ;(() => {
      if (searchValue && searchValue.length > 0) {
        const filteredData = chat.groups.filter((group) => {
          if (group.is_group === 'false') {
            return group.pm_name.toLowerCase().includes(debounceValue)
          }
          return group.group_name.toLowerCase().includes(debounceValue)
        })

        setSearchData(filteredData)
        setIsSearching(true)
      } else {
        setIsSearching(false)
      }
    })()
  }, [debounceValue])

  useEffect(() => {
    latestChatSubscribe({
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
            groups: [subscriptionData.data.memberAdded.group, ...prev.groups],
          }
        }
      },
    })
    groupsSubscribeToMore({
      document: GroupCreatedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        if (
          !(subscriptionData.data.groupCreated.blame.id === user.currentUser.id)
        )
          return prev
        if (
          !prev.groups.some(
            (group) => group.id === subscriptionData.data.groupCreated.group.id
          )
        ) {
          refetchLatestChat()

          return {
            groups: [subscriptionData.data.groupCreated.group, ...prev.groups],
          }
        }
      },
    })
    groupsSubscribeToMore({
      document: MemberRemovedDocument,
      variables: { user: user.currentUser.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        if (
          !(subscriptionData.data.memberRemoved.user.id === user.currentUser.id)
        )
          return prev

        console.log(prev)

        const updatedGroupList = prev.groups.filter(
          (group) => group.id !== subscriptionData.data.memberRemoved.group.id
        )

        navigate('/')
        notify(
          `You are removed from ${subscriptionData.data.memberRemoved.group.group_name}`
        )
        return {
          groups: updatedGroupList,
        }
      },
    })
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorText>Something went wrong</ErrorText>
  if (latestLoading) return <LoadingSpinner />
  if (latestError) return <ErrorText>Something went wrong</ErrorText>

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
            <SpawnModal title="Create conversation" closeModal={closeModal}>
              <JoinChat closeModal={closeModal} />
            </SpawnModal>
          )}
          <Button onClick={showModal}>
            <MdAdd />
          </Button>
        </div>
        <div className="search">
          <form onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
              type="text"
              placeholder="Search Chats"
            />
          </form>
        </div>
      </div>

      <div className="bottom">
        <ChatList
          chats={isSearching ? searchData : chat.groups}
          latest={latestChats.latestChats}
          showOnlyMiddle={showOnlyMiddle}
        />
      </div>
    </div>
  )
}
