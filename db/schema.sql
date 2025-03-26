-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'police', 'insurance', 'dvla', 'nic', 'driver')),
  organization TEXT,
  is_superuser BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  password_expiry TIMESTAMP WITH TIME ZONE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create accident_reports table
CREATE TABLE IF NOT EXISTS accident_reports (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('minor', 'moderate', 'severe')),
  vehicles TEXT[] NOT NULL,
  drivers TEXT[] NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
  reporting_officer TEXT NOT NULL,
  evidence_ids TEXT[],
  weather_conditions TEXT,
  road_conditions TEXT,
  light_conditions TEXT,
  injuries INTEGER DEFAULT 0,
  fatalities INTEGER DEFAULT 0,
  witnesses TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create insurance_claims table
CREATE TABLE IF NOT EXISTS insurance_claims (
  id TEXT PRIMARY KEY,
  accident_id TEXT NOT NULL REFERENCES accident_reports(id),
  policy_number TEXT NOT NULL,
  claimant TEXT NOT NULL,
  claimant_contact TEXT NOT NULL,
  vehicle_reg TEXT NOT NULL,
  date_submitted DATE NOT NULL,
  date_processed DATE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
  description TEXT NOT NULL,
  handling_agent TEXT NOT NULL,
  documents TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subrogation_claims table
CREATE TABLE IF NOT EXISTS subrogation_claims (
  id TEXT PRIMARY KEY,
  accident_id TEXT NOT NULL REFERENCES accident_reports(id),
  claim_id TEXT NOT NULL REFERENCES insurance_claims(id),
  claiming_company TEXT NOT NULL,
  responding_company TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date_submitted DATE NOT NULL,
  date_resolved DATE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'disputed', 'resolved', 'withdrawn')),
  description TEXT NOT NULL,
  evidence_ids TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create insurance_companies table
CREATE TABLE IF NOT EXISTS insurance_companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  total_policies INTEGER NOT NULL DEFAULT 0,
  total_claims INTEGER NOT NULL DEFAULT 0,
  pending_claims INTEGER NOT NULL DEFAULT 0,
  pending_subrogations INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('active', 'suspended', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create evidence table
CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  accident_id TEXT NOT NULL REFERENCES accident_reports(id),
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accident_reports_status ON accident_reports(status);
CREATE INDEX IF NOT EXISTS idx_insurance_claims_status ON insurance_claims(status);
CREATE INDEX IF NOT EXISTS idx_insurance_claims_accident_id ON insurance_claims(accident_id);
CREATE INDEX IF NOT EXISTS idx_subrogation_claims_status ON subrogation_claims(status);
CREATE INDEX IF NOT EXISTS idx_subrogation_claims_accident_id ON subrogation_claims(accident_id);
CREATE INDEX IF NOT EXISTS idx_evidence_accident_id ON evidence(accident_id);

