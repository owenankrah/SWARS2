/**
 * DVLA Search Page
 *
 * This component provides a search interface for DVLA officers to find
 * vehicle information, accident reports, and driver details.
 *
 * @component
 * @returns {JSX.Element} The DVLA search page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { SearchRecords } from "@/components/search-records"

export default function DVLASearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Search Records" organization="Driver and Vehicle Licensing Authority" />
      <SearchRecords />
    </div>
  )
}

