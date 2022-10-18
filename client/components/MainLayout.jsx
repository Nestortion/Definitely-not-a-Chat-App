import PageHeader from './PageHeader'

export default function MainLayout({ children }) {
  return (
    <>
      <PageHeader type="main" />
      {children}
    </>
  )
}
