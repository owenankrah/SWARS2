/**
 * Police Search Page
 *
 * This component provides a search interface for police officers to find
 * accident reports, vehicles, drivers, and related information.
 *
 * @component
 * @returns {JSX.Element} The police search page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { SearchRecords } from "@/components/search-records"

export default function PoliceSearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Search Records" organization="Ghana Police Service" />
      <SearchRecords />
    </div>
  )
}

