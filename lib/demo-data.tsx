// Define interfaces for our data types
export interface AccidentReport {
  id: string
  date: string
  location: string
  description: string
  severity: "minor" | "moderate" | "severe"
  vehicles: string[]
  drivers: string[]
  status: "pending" | "approved" | "rejected"
  reportingOfficer: string
  evidenceIds?: string[]
}

export interface InsuranceClaim {
  id: string
  accidentId: string
  policyNumber: string
  claimant: string
  claimantContact: string
  vehicleReg: string
  dateSubmitted: string
  dateProcessed?: string
  amount: number
  status: "pending" | "approved" | "rejected" | "paid"
  description: string
  handlingAgent: string
  documents: string[]
}

export interface SubrogationClaim {
  id: string
  accidentId: string
  claimId: string
  claimingCompany: string
  respondingCompany: string
  amount: number
  dateSubmitted: string
  dateResolved?: string
  status: "pending" | "accepted" | "disputed" | "resolved" | "withdrawn"
  description: string
  evidenceIds: string[]
}

export interface InsuranceCompany {
  id: string
  name: string
  code: string
  address: string
  contactPhone: string
  contactEmail: string
  totalPolicies: number
  totalClaims: number
  pendingClaims: number
  pendingSubrogations: number
  status: "active" | "suspended" | "inactive"
}

// Sample data for accident reports
export const pendingAccidents: AccidentReport[] = [
  {
    id: "ACC-2023-001",
    date: "2023-05-15",
    location: "Accra Ring Road, near Danquah Circle",
    description: "Two-vehicle collision at intersection",
    severity: "moderate",
    vehicles: ["GR-1234-20", "GW-5678-21"],
    drivers: ["John Doe", "Jane Smith"],
    status: "pending",
    reportingOfficer: "Officer Mensah",
    evidenceIds: ["EV-001", "EV-002"],
  },
  {
    id: "ACC-2023-002",
    date: "2023-05-18",
    location: "Tema Motorway, KM 12",
    description: "Single vehicle accident, car veered off road",
    severity: "minor",
    vehicles: ["GT-9012-19"],
    drivers: ["Samuel Osei"],
    status: "pending",
    reportingOfficer: "Officer Addo",
    evidenceIds: ["EV-003"],
  },
  {
    id: "ACC-2023-003",
    date: "2023-05-20",
    location: "Kumasi-Accra Highway, near Nkawkaw",
    description: "Multi-vehicle collision involving truck and two cars",
    severity: "severe",
    vehicles: ["GN-3456-22", "GS-7890-20", "GT-1234-18"],
    drivers: ["Kwame Asante", "Abena Mensah", "Kofi Owusu"],
    status: "pending",
    reportingOfficer: "Officer Boateng",
    evidenceIds: ["EV-004", "EV-005", "EV-006"],
  },
]

export const approvedAccidents: AccidentReport[] = [
  {
    id: "ACC-2023-004",
    date: "2023-04-10",
    location: "Spintex Road, near Palace Mall",
    description: "Rear-end collision at traffic light",
    severity: "minor",
    vehicles: ["GR-5678-21", "GW-9012-22"],
    drivers: ["Ama Darko", "Kwesi Boateng"],
    status: "approved",
    reportingOfficer: "Officer Ansah",
    evidenceIds: ["EV-007", "EV-008"],
  },
  {
    id: "ACC-2023-005",
    date: "2023-04-15",
    location: "Tetteh Quarshie Interchange",
    description: "Side collision during lane change",
    severity: "moderate",
    vehicles: ["GT-3456-19", "GS-7890-20"],
    drivers: ["Yaw Mensa", "Akua Sarpong"],
    status: "approved",
    reportingOfficer: "Officer Tetteh",
    evidenceIds: ["EV-009", "EV-010"],
  },
]

// Combine pending and approved accidents for a complete list
export const accidentReports: AccidentReport[] = [
  ...pendingAccidents,
  ...approvedAccidents,
  {
    id: "ACC-2023-006",
    date: "2023-03-22",
    location: "Achimota, near the Overhead",
    description: "Pedestrian accident, minor injuries",
    severity: "moderate",
    vehicles: ["GR-1122-20"],
    drivers: ["Eric Ofori"],
    status: "approved",
    reportingOfficer: "Officer Kumi",
    evidenceIds: ["EV-011"],
  },
  {
    id: "ACC-2023-007",
    date: "2023-03-05",
    location: "Legon Road, near University of Ghana",
    description: "Motorcycle and car collision",
    severity: "severe",
    vehicles: ["GW-3344-21", "No registration (motorcycle)"],
    drivers: ["Daniel Agyei", "Mohammed Ibrahim"],
    status: "approved",
    reportingOfficer: "Officer Appiah",
    evidenceIds: ["EV-012", "EV-013"],
  },
]

// Sample data for insurance claims
export const insuranceClaims: InsuranceClaim[] = [
  {
    id: "CLM-2023-001",
    accidentId: "ACC-2023-001",
    policyNumber: "POL-12345",
    claimant: "John Doe",
    claimantContact: "+233 20 123 4567",
    vehicleReg: "GR-1234-20",
    dateSubmitted: "2023-05-16",
    amount: 5000,
    status: "pending",
    description: "Front bumper damage and headlight replacement",
    handlingAgent: "Akosua Frimpong",
    documents: ["Policy document", "Accident report", "Repair estimate"],
  },
  {
    id: "CLM-2023-002",
    accidentId: "ACC-2023-003",
    policyNumber: "POL-23456",
    claimant: "Kwame Asante",
    claimantContact: "+233 24 987 6543",
    vehicleReg: "GN-3456-22",
    dateSubmitted: "2023-05-21",
    amount: 12000,
    status: "pending",
    description: "Extensive damage to passenger side, door replacement needed",
    handlingAgent: "Benjamin Osei",
    documents: ["Policy document", "Accident report", "Police statement", "Repair estimate"],
  },
  {
    id: "CLM-2023-003",
    accidentId: "ACC-2023-004",
    policyNumber: "POL-34567",
    claimant: "Ama Darko",
    claimantContact: "+233 27 456 7890",
    vehicleReg: "GR-5678-21",
    dateSubmitted: "2023-04-11",
    dateProcessed: "2023-04-18",
    amount: 3500,
    status: "approved",
    description: "Rear bumper repair and tail light replacement",
    handlingAgent: "Comfort Mensah",
    documents: ["Policy document", "Accident report", "Repair invoice"],
  },
  {
    id: "CLM-2023-004",
    accidentId: "ACC-2023-005",
    policyNumber: "POL-45678",
    claimant: "Yaw Mensa",
    claimantContact: "+233 23 789 0123",
    vehicleReg: "GT-3456-19",
    dateSubmitted: "2023-04-16",
    dateProcessed: "2023-04-25",
    amount: 7500,
    status: "approved",
    description: "Driver side door and mirror replacement",
    handlingAgent: "David Ankrah",
    documents: ["Policy document", "Accident report", "Repair invoice", "Photos"],
  },
  {
    id: "CLM-2023-005",
    accidentId: "ACC-2023-007",
    policyNumber: "POL-56789",
    claimant: "Daniel Agyei",
    claimantContact: "+233 26 012 3456",
    vehicleReg: "GW-3344-21",
    dateSubmitted: "2023-03-06",
    dateProcessed: "2023-03-20",
    amount: 15000,
    status: "rejected",
    description: "Claim for comprehensive damage, policy only covers third party",
    handlingAgent: "Esther Boateng",
    documents: ["Policy document", "Accident report", "Repair estimate", "Police statement"],
  },
]

// Sample data for subrogation claims
export const subrogationClaims: SubrogationClaim[] = [
  {
    id: "SUB-2023-001",
    accidentId: "ACC-2023-001",
    claimId: "CLM-2023-001",
    claimingCompany: "Star Assurance",
    respondingCompany: "Enterprise Insurance",
    amount: 3500,
    dateSubmitted: "2023-05-25",
    status: "pending",
    description: "Subrogation claim for accident where responding party was at fault",
    evidenceIds: ["EV-001", "EV-002", "SUB-DOC-001"],
  },
  {
    id: "SUB-2023-002",
    accidentId: "ACC-2023-003",
    claimId: "CLM-2023-002",
    claimingCompany: "SIC Insurance",
    respondingCompany: "Phoenix Insurance",
    amount: 8000,
    dateSubmitted: "2023-05-30",
    status: "pending",
    description: "Subrogation claim for multi-vehicle accident, partial fault determination",
    evidenceIds: ["EV-004", "EV-005", "SUB-DOC-002"],
  },
  {
    id: "SUB-2023-003",
    accidentId: "ACC-2023-005",
    claimId: "CLM-2023-004",
    claimingCompany: "Vanguard Assurance",
    respondingCompany: "Star Assurance",
    amount: 5000,
    dateSubmitted: "2023-04-28",
    dateResolved: "2023-05-15",
    status: "resolved",
    description: "Subrogation claim for side collision, 70-30 fault split",
    evidenceIds: ["EV-009", "EV-010", "SUB-DOC-003"],
  },
  {
    id: "SUB-2023-004",
    accidentId: "ACC-2023-007",
    claimId: "CLM-2023-005",
    claimingCompany: "Enterprise Insurance",
    respondingCompany: "Metropolitan Insurance",
    amount: 10000,
    dateSubmitted: "2023-03-25",
    status: "disputed",
    description: "Disputed subrogation claim, disagreement on fault determination",
    evidenceIds: ["EV-012", "EV-013", "SUB-DOC-004", "SUB-DOC-005"],
  },
]

// Sample data for insurance companies
export const insuranceCompanies: InsuranceCompany[] = [
  {
    id: "INS-001",
    name: "Star Assurance",
    code: "STAR",
    address: "Star House, Independence Avenue, Accra",
    contactPhone: "+233 302 123 456",
    contactEmail: "info@starassurance.com",
    totalPolicies: 25000,
    totalClaims: 1250,
    pendingClaims: 85,
    pendingSubrogations: 12,
    status: "active",
  },
  {
    id: "INS-002",
    name: "SIC Insurance",
    code: "SIC",
    address: "SIC Plaza, Accra Central",
    contactPhone: "+233 302 234 567",
    contactEmail: "info@sic-gh.com",
    totalPolicies: 35000,
    totalClaims: 1800,
    pendingClaims: 120,
    pendingSubrogations: 18,
    status: "active",
  },
  {
    id: "INS-003",
    name: "Enterprise Insurance",
    code: "ENT",
    address: "Enterprise House, Ring Road, Accra",
    contactPhone: "+233 302 345 678",
    contactEmail: "info@enterprisegroup.com.gh",
    totalPolicies: 28000,
    totalClaims: 1400,
    pendingClaims: 95,
    pendingSubrogations: 15,
    status: "active",
  },
  {
    id: "INS-004",
    name: "Phoenix Insurance",
    code: "PHX",
    address: "Phoenix Tower, Osu, Accra",
    contactPhone: "+233 302 456 789",
    contactEmail: "info@phoenixinsurance.com.gh",
    totalPolicies: 18000,
    totalClaims: 950,
    pendingClaims: 65,
    pendingSubrogations: 8,
    status: "active",
  },
  {
    id: "INS-005",
    name: "Vanguard Assurance",
    code: "VAN",
    address: "Vanguard House, Ridge, Accra",
    contactPhone: "+233 302 567 890",
    contactEmail: "info@vanguardassurance.com",
    totalPolicies: 22000,
    totalClaims: 1100,
    pendingClaims: 75,
    pendingSubrogations: 10,
    status: "active",
  },
  {
    id: "INS-006",
    name: "Metropolitan Insurance",
    code: "MET",
    address: "Metropolitan Building, High Street, Accra",
    contactPhone: "+233 302 678 901",
    contactEmail: "info@metinsurance.com",
    totalPolicies: 15000,
    totalClaims: 800,
    pendingClaims: 55,
    pendingSubrogations: 7,
    status: "active",
  },
]

