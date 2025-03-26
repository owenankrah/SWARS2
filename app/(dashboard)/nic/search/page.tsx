/**
 * NIC Search Page
 *
 * This component provides a search interface for NIC staff to find
 * accident reports, insurance claims, and related information.
 *
 * @component
 * @returns {JSX.Element} The NIC search page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { SearchRecords } from "@/components/search-records"

export default function NICSearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Search Records" organization="National Insurance Commission" />
      <SearchRecords />
    </div>
  )
}

