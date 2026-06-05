/**
 * HOACONDInsight™ Emergency Operations Engine
 * 10 emergency types. Founder + C-Suite auth gate. Permanent audit trail.
 */
export const EMERGENCY_TYPES = [
  { id: 'data_breach',       label: 'Data Breach',                   level: 'CRITICAL', requiresLegal: true,  stateNotify: true,  notifyWithin: '72 hours (state breach laws)', warnAct: false },
  { id: 'service_outage',    label: 'Service Outage',                level: 'HIGH',     requiresLegal: false, stateNotify: false, notifyWithin: '1 hour', warnAct: false },
  { id: 'regulatory_change', label: 'Regulatory Change',             level: 'HIGH',     requiresLegal: true,  stateNotify: false, notifyWithin: '24 hours', warnAct: false },
  { id: 'legal_demand',      label: 'Legal Demand / Lawsuit',        level: 'CRITICAL', requiresLegal: true,  stateNotify: false, notifyWithin: 'Immediately', warnAct: false },
  { id: 'report_quality',    label: 'Report Quality Issue',          level: 'MEDIUM',   requiresLegal: false, stateNotify: false, notifyWithin: '4 hours', warnAct: false },
  { id: 'press_release',     label: 'Press Release / Media',         level: 'HIGH',     requiresLegal: true,  stateNotify: false, notifyWithin: 'Upon approval', warnAct: false },
  { id: 'natural_disaster',  label: 'Natural Disaster / Closure',    level: 'MEDIUM',   requiresLegal: false, stateNotify: false, notifyWithin: '2 hours', warnAct: false },
  { id: 'attorney_crisis',   label: 'Attorney Network Crisis',       level: 'HIGH',     requiresLegal: true,  stateNotify: false, notifyWithin: '4 hours', warnAct: false },
  { id: 'ip_threat',         label: 'IP / Patent Threat',            level: 'CRITICAL', requiresLegal: true,  stateNotify: false, notifyWithin: 'Immediately', warnAct: false },
  { id: 'mass_layoff',       label: 'Workforce Reduction (WARN Act)',level: 'HIGH',     requiresLegal: true,  stateNotify: true,  notifyWithin: '60 days required', warnAct: true },
];

export function canDeploy(founderApproved, csuiteApproved, emergencyType) {
  const type = EMERGENCY_TYPES.find(e => e.id === emergencyType);
  if (type?.level === 'CRITICAL') return founderApproved && csuiteApproved;
  return founderApproved || csuiteApproved;
}

export function getEmergencyType(id) {
  return EMERGENCY_TYPES.find(e => e.id === id);
}

export function generateEmergencyLog(type, deployedBy, message) {
  return {
    id: `EMG-${Date.now()}`,
    type, deployedBy, message,
    timestamp: new Date().toISOString(),
    auditTrail: true,
    permanent: true,
    note: 'This log entry cannot be deleted or modified.',
  };
}

export function getNotificationList(emergencyType) {
  const ALWAYS = ['peterkleinusa@gmail.com','peter@hoacondinsight.com','ceo@hoacondinsight.com'];
  const type = EMERGENCY_TYPES.find(e => e.id === emergencyType);
  if (type?.requiresLegal) return [...ALWAYS, 'legal@hoacondinsight.com'];
  return ALWAYS;
}

export const emergencyOperationsEngineConfig = { name: 'emergencyOperationsEngine', version: '5.1', types: EMERGENCY_TYPES.length };
export default emergencyOperationsEngineConfig;
