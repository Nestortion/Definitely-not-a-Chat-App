import Head from 'next/head'
import ListHeader from '../components/ListHeader'
import UserList from '../components/UserList'

export default function userlist() {
  return (
    <>
      <Head>
        <title>User List | DNCA</title>
      </Head>
      <ListHeader />
      <UserList title={'User'} />
    </>
  )
}
