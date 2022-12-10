import ErrorText from '../../components/Error/ErrorText'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import { useUserQuery } from '../../graphql/hooks/graphql'

export default function ProfileSettings() {
  const { data: userData, userLoading, error: userError } = useUserQuery()

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText />

  console.log(userData)
  return <div>ProfileSettings</div>
}
