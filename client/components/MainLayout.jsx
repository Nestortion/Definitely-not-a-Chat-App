import PageHeader from './PageHeader'

export default function MainLayout({ children }) {
  return (
    <div>
      <PageHeader type="main" />
      {children}
    </div>
  )
}
