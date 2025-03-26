# Single Window Accident Reporting System

## Overview

The Single Window Accident Reporting System is a comprehensive platform that enables various stakeholders in Ghana's transportation and insurance sectors to collaborate on accident reporting, evidence collection, fault determination, and claims processing. The system serves as a centralized database for all reported accidents and feeds into a national vehicle and driver history database.

## Key Stakeholders

- **Ghana Police Service**: Responsible for accident reporting, fault determination, and report generation
- **Driver and Vehicle Licensing Authority (DVLA)**: Handles vehicle registration, damage assessment, and evidence management
- **Insurance Companies**: Manage claims, access driver history, and verify policies
- **National Insurance Commission (NIC)**: Provides regulatory oversight and access to statistics
- **Drivers**: Access their vehicle information, claim status, and accident reports

## System Architecture

The system follows a role-based access control model where each stakeholder has specific permissions and access to relevant features. The architecture is designed to ensure data integrity, security, and seamless collaboration between different agencies.

### User Roles and Permissions

#### Police
- Create and update accident reports
- Determine fault in accidents
- Approve and generate official reports
- Manage officer accounts

#### DVLA
- Update accident reports with vehicle information
- Upload evidence (photos, videos)
- Conduct damage assessments
- Maintain vehicle database

#### Insurance Companies
- View accident reports
- Create and manage claims
- Access driver history
- Generate reports for internal use

#### NIC
- View accident reports and statistics
- Monitor insurance company activities
- Generate regulatory reports
- Access industry-wide data

#### Drivers
- View their accident reports
- Track claim status
- Manage vehicle information
- Update personal details

#### Admin
- Manage user accounts across all roles
- Configure system settings
- Monitor system performance
- Generate administrative reports

## Features

### Accident Reporting
- Structured forms for comprehensive accident details
- Location mapping with GPS coordinates
- Vehicle and driver information collection
- Witness statements and officer observations

### Evidence Management
- Photo and video upload capabilities
- Document attachment support
- Evidence categorization and tagging
- Secure storage with access controls

### Fault Determination
- Structured assessment criteria
- Multi-factor evaluation
- Officer review and approval process
- Appeal mechanism for contested determinations

### Claims Processing
- Automated claim creation from accident reports
- Status tracking throughout the lifecycle
- Document attachment for supporting evidence
- Payment recording and history

### Reporting and Analytics
- Customizable report generation
- Statistical analysis of accident data
- Trend identification and visualization
- Export capabilities in multiple formats

### User Management
- Role-based access control
- Bulk user import via CSV
- Password policy enforcement
- Account activity monitoring

## Installation and Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn
- Git

### Installation Steps
1. Clone the repository

