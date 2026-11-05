import api from './api';

/**
 * Frontend API Service for Members Resource (Sprint 17: Second CRUD Module)
 * Handles all HTTP REST communication between React and Express backend
 * for library membership management.
 */
export const memberService = {
  /**
   * GET /api/members
   * Fetch all members from MongoDB via Express API
   */
  getAllMembers: async () => {
    const response = await api.get('/members');
    return response.data;
  },

  /**
   * GET /api/members/:id
   * Fetch a single member by ID or membershipId
   */
  getMemberById: async (id) => {
    const response = await api.get(`/members/${id}`);
    return response.data;
  },

  /**
   * POST /api/members
   * Register a new member document in MongoDB
   */
  createMember: async (memberData) => {
    const response = await api.post('/members', memberData);
    return response.data;
  },

  /**
   * PUT /api/members/:id
   * Update an existing member's details in MongoDB
   */
  updateMember: async (id, memberData) => {
    const response = await api.put(`/members/${id}`, memberData);
    return response.data;
  },

  /**
   * DELETE /api/members/:id
   * Remove a member document from MongoDB
   */
  deleteMember: async (id) => {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  },
};

export default memberService;
