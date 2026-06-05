import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database Schema SQL — Run in Supabase SQL Editor
export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS hoa_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_address TEXT NOT NULL,
  hoa_name TEXT,
  health_score INTEGER,
  fannie_mae_status TEXT CHECK (fannie_mae_status IN ('PASS','FAIL','PENDING')),
  attorney_id UUID,
  attorney_status TEXT DEFAULT 'pending',
  report_url TEXT,
  order_id TEXT,
  customer_email TEXT,
  user_type TEXT,
  buyer_protection_ordered BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS attorneys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
  state TEXT NOT NULL, license_number TEXT,
  quality_score NUMERIC DEFAULT 100,
  total_analyses INTEGER DEFAULT 0,
  total_earnings NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lender_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
  tier TEXT CHECK (tier IN ('branch','regional','enterprise')),
  monthly_fee NUMERIC, active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS white_label_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
  tier TEXT CHECK (tier IN ('starter','professional','enterprise')),
  monthly_fee NUMERIC, status TEXT DEFAULT 'active',
  brand_config JSONB, created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS associations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, type TEXT CHECK (type IN ('HOA','CONDO','BOTH')),
  unit_count INTEGER, property_manager_email TEXT,
  subscription_tier TEXT, monthly_fee NUMERIC,
  documents_uploaded INTEGER DEFAULT 0,
  compliance_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
  partner_type TEXT, referral_code TEXT UNIQUE,
  total_referrals INTEGER DEFAULT 0, total_earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_payment_id TEXT, customer_email TEXT NOT NULL,
  analysis_id UUID REFERENCES hoa_analyses(id),
  amount NUMERIC NOT NULL, status TEXT DEFAULT 'pending',
  user_type TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS system_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, description TEXT,
  submitted_by TEXT, status TEXT DEFAULT 'pending',
  approved_by TEXT, approved_at TIMESTAMPTZ,
  claude_session_ref TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS integration_data_syncs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  integration_name TEXT NOT NULL, sync_direction TEXT,
  records_synced INTEGER DEFAULT 0, status TEXT DEFAULT 'pending',
  error_message TEXT, executed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS video_training (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, user_level TEXT,
  script TEXT, status TEXT DEFAULT 'pending_approval',
  approved_by TEXT, created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deployment control tables
CREATE TABLE IF NOT EXISTS deployment_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  state TEXT NOT NULL CHECK (state IN ('LIVE','OFFLINE','TESTING','READONLY')),
  updated_by TEXT NOT NULL,
  reason TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default OFFLINE state on first run
INSERT INTO deployment_config (state, updated_by, reason)
SELECT 'OFFLINE', 'system', 'Initial deployment — requires Founder/C-Suite activation'
WHERE NOT EXISTS (SELECT 1 FROM deployment_config LIMIT 1);

CREATE TABLE IF NOT EXISTS deployment_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id TEXT UNIQUE NOT NULL,
  from_state TEXT,
  to_state TEXT NOT NULL,
  performed_by TEXT NOT NULL,
  reason TEXT,
  notifications_sent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  permanent BOOLEAN DEFAULT TRUE
);
-- Row-level security: deployment_audit_log is READ ONLY after insert (never update, never delete)

-- Communications tables
CREATE TABLE IF NOT EXISTS email_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_id TEXT UNIQUE NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound','outbound')),
  from_address TEXT,
  to_address TEXT,
  subject TEXT NOT NULL,
  category TEXT,
  priority TEXT DEFAULT 'normal',
  has_attachment BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'received',
  read BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  retain_until TIMESTAMPTZ,
  permanent BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS communication_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  platform TEXT NOT NULL,
  direction TEXT,
  participants TEXT,
  summary TEXT,
  duration_seconds INTEGER,
  recorded BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  permanent BOOLEAN DEFAULT TRUE
);

-- Security and backup tables
CREATE TABLE IF NOT EXISTS backup_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  backup_id TEXT UNIQUE NOT NULL,
  tables_backed_up INTEGER,
  size_bytes BIGINT,
  status TEXT DEFAULT 'success',
  storage_location TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  permanent BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS security_alert_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  source_ip TEXT,
  description TEXT,
  action_taken TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  permanent BOOLEAN DEFAULT TRUE
);

-- SOP validation log
CREATE TABLE IF NOT EXISTS sop_validation_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id TEXT UNIQUE NOT NULL,
  vendor_name TEXT NOT NULL,
  vendor_website TEXT,
  passed BOOLEAN NOT NULL,
  critical_failures INTEGER DEFAULT 0,
  total_failures INTEGER DEFAULT 0,
  validated_by TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  permanent BOOLEAN DEFAULT TRUE
);

-- Technology update log  
CREATE TABLE IF NOT EXISTS tech_update_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_date DATE,
  tech_name TEXT,
  update_type TEXT,
  version TEXT,
  priority TEXT,
  plain_english TEXT,
  reviewed BOOLEAN DEFAULT FALSE,
  applied BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Consent tracking tables (Florida § 934.03 compliance)
CREATE TABLE IF NOT EXISTS consent_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_type TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  consented BOOLEAN NOT NULL DEFAULT TRUE,
  consent_timestamp TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  florida_two_party_consent BOOLEAN DEFAULT TRUE,
  ecpa_consent BOOLEAN DEFAULT TRUE,
  sca_consent BOOLEAN DEFAULT TRUE,
  tcpa_sms_consent BOOLEAN DEFAULT FALSE,
  annual_renewal_due TIMESTAMPTZ,
  permanent BOOLEAN DEFAULT TRUE
);

-- Legal document update log
CREATE TABLE IF NOT EXISTS legal_update_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  update_id TEXT UNIQUE NOT NULL,
  change_type TEXT NOT NULL,
  description TEXT NOT NULL,
  requires_attorney BOOLEAN DEFAULT TRUE,
  auto_deployed BOOLEAN DEFAULT FALSE,
  approved_by TEXT,
  approval_timestamp TIMESTAMPTZ,
  scan_timestamp TIMESTAMPTZ DEFAULT NOW(),
  permanent BOOLEAN DEFAULT TRUE
);
`;

export default supabase;
