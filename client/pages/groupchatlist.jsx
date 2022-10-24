import Head from 'next/head'
import ListHeader from '../components/ListHeader'
import UserList from '../components/UserList'

export default function groupchatlist() {
  return (
    <>
      <Head>
        <title>Group Chat List | DNCA</title>
      </Head>
      <ListHeader />
      <UserList title={'Group Chat'} />
    </>
  )
}
