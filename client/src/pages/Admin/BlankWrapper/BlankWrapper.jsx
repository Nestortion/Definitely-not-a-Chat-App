import React from 'react'
import { Outlet } from 'react-router-dom'
import ErrorText from '../../../components/Error/ErrorText'
import LoadingSpinner from '../../../components/Loading/LoadingSpinner/LoadingSpinner'
import { useCurrentUserQuery } from '../../../graphql/hooks/graphql'

export default function BlankWrapper({ closeMenu, openMenu }) {
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Something went wrong</ErrorText>

  return <Outlet context={{ openMenu, closeMenu, user }} />
}
