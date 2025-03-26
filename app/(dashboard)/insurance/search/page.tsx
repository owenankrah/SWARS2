/**
 * Insurance Search Page
 *
 * This component provides a search interface for insurance company staff to find
 * accident reports, claims, vehicles, and driver information.
 *
 * @component
 * @returns {JSX.Element} The insurance search page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { SearchRecords } from "@/components/search-records"

export default function InsuranceSearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Search Records" organization="Insurance Company" />
      <SearchRecords />
    </div>
  )
}

