import Head from 'next/head'
import ChatFeedContainer from '../components/MainChat/ChatFeedContainer'
import ChatListContainer from '../components/MainChat/ChatListContainer'
import ChatSettingsContainer from '../components/MainChat/ChatSettingsContainer'
import { MainChatStyled } from '../components/styles/MainChatStyled'

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat | DNCA</title>
      </Head>
      <MainChatStyled>
        <ChatListContainer />
        <ChatFeedContainer />
        <ChatSettingsContainer />
      </MainChatStyled>
    </>
  )
}
