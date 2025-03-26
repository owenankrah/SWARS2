-- Seed users
INSERT INTO users (id, email, name, role, organization, is_superuser)
VALUES
  ('1', 'admin@example.com', 'Admin User', 'admin', 'System Administration', false),
  ('2', 'police@example.com', 'Police Officer', 'police', 'Ghana Police Service', false),
  ('3', 'insurance@example.com', 'Insurance Agent', 'insurance', 'Star Assurance', false),
  ('4', 'dvla@example.com', 'DVLA Officer', 'dvla', 'Driver and Vehicle Licensing Authority', false),
  ('5', 'nic@example.com', 'NIC Officer', 'nic', 'National Insurance Commission', false),
  ('6', 'driver@example.com', 'Driver User', 'driver', null, false)
ON CONFLICT (id) DO NOTHING;

-- Seed insurance companies
INSERT INTO insurance_companies (id, name, code, address, contact_phone, contact_email, total_policies, total_claims, pending_claims, pending_subrogations, status)
VALUES
  ('INS-001', 'Star Assurance', 'STAR', 'Star House, Independence Avenue, Accra', '+233 302 123 456', 'info@starassurance.com', 25000, 1250, 85, 12, 'active'),
  ('INS-002', 'SIC Insurance', 'SIC', 'SIC Plaza, Accra Central', '+233 302 234 567', 'info@sic-gh.com', 35000, 1800, 120, 18, 'active'),
  ('INS-003', 'Enterprise Insurance', 'ENT', 'Enterprise House, Ring Road, Accra', '+233 302 345 678', 'info@enterprisegroup.com.gh', 28000, 1400, 95, 15, 'active'),
  ('INS-004', 'Phoenix Insurance', 'PHX', 'Phoenix Tower, Osu, Accra', '+233 302 456 789', 'info@phoenixinsurance.com.gh', 18000, 950, 65, 8, 'active'),
  ('INS-005', 'Vanguard Assurance', 'VAN', 'Vanguard House, Ridge, Accra', '+233 302 567 890', 'info@vanguardassurance.com', 22000, 1100, 75, 10, 'active'),
  ('INS-006', 'Metropolitan Insurance', 'MET', 'Metropolitan Building, High Street, Accra', '+233 302 678 901', 'info@metinsurance.com', 15000, 800, 55, 7, 'active')
ON CONFLICT (id) DO NOTHING;

-- Seed accident reports
INSERT INTO accident_reports (id, date, location, description, severity, vehicles, drivers, status, reporting_officer, evidence_ids, weather_conditions, road_conditions, light_conditions, injuries, fatalities, witnesses)
VALUES
  ('ACC-2023-001', '2023-05-15', 'Accra Ring Road, near Danquah Circle', 'Two-vehicle collision at intersection', 'moderate', ARRAY['GR-1234-20', 'GW-5678-21'], ARRAY['John Doe', 'Jane Smith'], 'pending', 'Officer Mensah', ARRAY['EV-001', 'EV-002'], 'clear', 'dry', 'daylight', 2, 0, 'Kwame Nkrumah, 0244123456'),
  ('ACC-2023-002', '2023-05-18', 'Tema Motorway, KM 12', 'Single vehicle accident, car veered off road', 'minor', ARRAY['GT-9012-19'], ARRAY['Samuel Osei'], 'pending', 'Officer Addo', ARRAY['EV-003'], 'rain', 'wet', 'night-lit', 1, 0, NULL),
  ('ACC-2023-003', '2023-05-20', 'Kumasi-Accra Highway, near Nkawkaw', 'Multi-vehicle collision involving truck and two cars', 'severe', ARRAY['GN-3456-22', 'GS-7890-20', 'GT-1234-18'], ARRAY['Kwame Asante', 'Abena Mensah', 'Kofi Owusu'], 'pending', 'Officer Boateng', ARRAY['EV-004', 'EV-005', 'EV-006'], 'clear', 'dry', 'daylight', 5, 1, 'Ama Serwaa, 0277654321; Yaw Mensah, 0244987654'),
  ('ACC-2023-004', '2023-04-10', 'Spintex Road, near Palace Mall', 'Rear-end collision at traffic light', 'minor', ARRAY['GR-5678-21', 'GW-9012-22'], ARRAY['Ama Darko', 'Kwesi Boateng'], 'approved', 'Officer Ansah', ARRAY['EV-007', 'EV-008'], 'clear', 'dry', 'daylight', 0, 0, NULL),
  ('ACC-2023-005', '2023-04-15', 'Tetteh Quarshie Interchange', 'Side collision during lane change', 'moderate', ARRAY['GT-3456-19', 'GS-7890-20'], ARRAY['Yaw Mensa', 'Akua Sarpong'], 'approved', 'Officer Tetteh', ARRAY['EV-009', 'EV-010'], 'clear', 'dry', 'daylight', 2, 0, 'John Mensah, 0244123456'),
  ('ACC-2023-006', '2023-03-22', 'Achimota, near the Overhead', 'Pedestrian accident, minor injuries', 'moderate', ARRAY['GR-1122-20'], ARRAY['Eric Ofori'], 'approved', 'Officer Kumi', ARRAY['EV-011'], 'clear', 'dry', 'daylight', 1, 0, NULL),
  ('ACC-2023-007', '2023-03-05', 'Legon Road, near University of Ghana', 'Motorcycle and car collision', 'severe', ARRAY['GW-3344-21', 'No registration (motorcycle)'], ARRAY['Daniel Agyei', 'Mohammed Ibrahim'], 'approved', 'Officer Appiah', ARRAY['EV-012', 'EV-013'], 'clear', 'dry', 'daylight', 2, 0, NULL)
ON CONFLICT (id) DO NOTHING;

-- Seed insurance claims
INSERT INTO insurance_claims (id, accident_id, policy_number, claimant, claimant_contact, vehicle_reg, date_submitted, date_processed, amount, status, description, handling_agent, documents)
VALUES
  ('CLM-2023-001', 'ACC-2023-001', 'POL-12345', 'John Doe', '+233 20 123 4567', 'GR-1234-20', '2023-05-16', NULL, 5000, 'pending', 'Front bumper damage and headlight replacement', 'Akosua Frimpong', ARRAY['Policy document', 'Accident report', 'Repair estimate']),
  ('CLM-2023-002', 'ACC-2023-003', 'POL-23456', 'Kwame Asante', '+233 24 987 6543', 'GN-3456-22', '2023-05-21', NULL, 12000, 'pending', 'Extensive damage to passenger side, door replacement needed', 'Benjamin Osei', ARRAY['Policy document', 'Accident report', 'Police statement', 'Repair estimate']),
  ('CLM-2023-003', 'ACC-2023-004', 'POL-34567', 'Ama Darko', '+233 27 456 7890', 'GR-5678-21', '2023-04-11', '2023-04-18', 3500, 'approved', 'Rear bumper repair and tail light replacement', 'Comfort Mensah', ARRAY['Policy document', 'Accident report', 'Repair invoice']),
  ('CLM-2023-004', 'ACC-2023-005', 'POL-45678', 'Yaw Mensa', '+233 23 789 0123', 'GT-3456-19', '2023-04-16', '2023-04-25', 7500, 'approved', 'Driver side door and mirror replacement', 'David Ankrah', ARRAY['Policy document', 'Accident report', 'Repair invoice', 'Photos']),
  ('CLM-2023-005', 'ACC-2023-007', 'POL-56789', 'Daniel Agyei', '+233 26 012 3456', 'GW-3344-21', '2023-03-06', '2023-03-20', 15000, 'rejected', 'Claim for comprehensive damage, policy only covers third party', 'Esther Boateng', ARRAY['Policy document', 'Accident report', 'Repair estimate', 'Police statement'])
ON CONFLICT (id) DO NOTHING;

-- Seed subrogation claims
INSERT INTO subrogation_claims (id, accident_id, claim_id, claiming_company, responding_company, amount, date_submitted, date_resolved, status, description, evidence_ids)
VALUES
  ('SUB-2023-001', 'ACC-2023-001', 'CLM-2023-001', 'Star Assurance', 'Enterprise Insurance', 3500, '2023-05-25', NULL, 'pending', 'Subrogation claim for accident where responding party was at fault', ARRAY['EV-001', 'EV-002', 'SUB-DOC-001']),
  ('SUB-2023-002', 'ACC-2023-003', 'CLM-2023-002', 'SIC Insurance', 'Phoenix Insurance', 8000, '2023-05-30', NULL, 'pending', 'Subrogation claim for multi-vehicle accident, partial fault determination', ARRAY['EV-004', 'EV-005', 'SUB-DOC-002']),
  ('SUB-2023-003', 'ACC-2023-005', 'CLM-2023-004', 'Vanguard Assurance', 'Star Assurance', 5000, '2023-04-28', '2023-05-15', 'resolved', 'Subrogation claim for side collision, 70-30 fault split', ARRAY['EV-009', 'EV-010', 'SUB-DOC-003']),
  ('SUB-2023-004', 'ACC-2023-007', 'CLM-2023-005', 'Enterprise Insurance', 'Metropolitan Insurance', 10000, '2023-03-25', NULL, 'disputed', 'Disputed subrogation claim, disagreement on fault determination', ARRAY['EV-012', 'EV-013', 'SUB-DOC-004', 'SUB-DOC-005'])
ON CONFLICT (id) DO NOTHING;

-- Seed evidence
INSERT INTO evidence (id, accident_id, file_path, file_type, uploaded_by, description)
VALUES
  ('EV-001', 'ACC-2023-001', '/evidence/ev-001.jpg', 'image/jpeg', 'Officer Mensah', 'Front view of vehicle damage'),
  ('EV-002', 'ACC-2023-001', '/evidence/ev-002.jpg', 'image/jpeg', 'Officer Mensah', 'Side view of vehicle damage'),
  ('EV-003', 'ACC-2023-002', '/evidence/ev-003.jpg', 'image/jpeg', 'Officer Addo', 'Vehicle off road'),
  ('EV-004', 'ACC-2023-003', '/evidence/ev-004.jpg', 'image/jpeg', 'Officer Boateng', 'Truck front damage'),
  ('EV-005', 'ACC-2023-003', '/evidence/ev-005.jpg', 'image/jpeg', 'Officer Boateng', 'Car side damage'),
  ('EV-006', 'ACC-2023-003', '/evidence/ev-006.jpg', 'image/jpeg', 'Officer Boateng', 'Second car rear damage'),
  ('EV-007', 'ACC-2023-004', '/evidence/ev-007.jpg', 'image/jpeg', 'Officer Ansah', 'Rear-end damage'),
  ('EV-008', 'ACC-2023-004', '/evidence/ev-008.jpg', 'image/jpeg', 'Officer Ansah', 'Front-end damage'),
  ('EV-009', 'ACC-2023-005', '/evidence/ev-009.jpg', 'image/jpeg', 'Officer Tetteh', 'Side collision damage 1'),
  ('EV-010', 'ACC-2023-005', '/evidence/ev-010.jpg', 'image/jpeg', 'Officer Tetteh', 'Side collision damage 2'),
  ('EV-011', 'ACC-2023-006', '/evidence/ev-011.jpg', 'image/jpeg', 'Officer Kumi', 'Vehicle front damage'),
  ('EV-012', 'ACC-2023-007', '/evidence/ev-012.jpg', 'image/jpeg', 'Officer Appiah', 'Car damage'),
  ('EV-013', 'ACC-2023-007', '/evidence/ev-013.jpg', 'image/jpeg', 'Officer Appiah', 'Motorcycle damage')
ON CONFLICT (id) DO NOTHING;

