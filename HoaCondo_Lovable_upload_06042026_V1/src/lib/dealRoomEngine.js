/**
 * HOACONDInsight™ Deal Room Engine
 * Shared transaction workspace: buyer + agent + loan officer — live collaboration
 */
export function createDealRoom(analysisId, participants) {
  return {
    roomId: `ROOM-${analysisId.slice(0,8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
    analysisId,
    participants,
    canView: participants.map(p => p.email),
    canComment: participants.map(p => p.email),
    canApprove: participants.filter(p => p.role === 'lender').map(p => p.email),
    sharedReport: true, liveComments: true, aiQA: true,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
  };
}

export function addComment(roomId, userEmail, userRole, comment) {
  return {
    id: `CMT-${Date.now()}`,
    roomId, userEmail, userRole, comment,
    timestamp: new Date().toISOString(),
    visible_to: 'all_participants',
  };
}

export function generateShareLink(roomId) {
  return `https://www.hoacondinsight.com/deal-room/${roomId}`;
}

export function getRoomParticipantRoles() {
  return ['buyer', 'buyer_attorney', 'realtor', 'loan_officer', 'title_officer'];
}

export function canUserAccess(userEmail, room) {
  return room.canView.includes(userEmail);
}

export const dealRoomEngineConfig = { name: 'dealRoomEngine', version: '5.1' };
export default dealRoomEngineConfig;
