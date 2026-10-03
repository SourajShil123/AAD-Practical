import { initialMembers } from '../data/mockData';

/**
 * Service resource for managing library members
 */
export const memberService = {
  getAllMembers: () => Promise.resolve([...initialMembers]),
  getMemberById: (id) => Promise.resolve(initialMembers.find((m) => m.id === id)),
  searchMembers: (query) => {
    const q = query.toLowerCase();
    return Promise.resolve(
      initialMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.department.toLowerCase().includes(q)
      )
    );
  },
};

export default memberService;
