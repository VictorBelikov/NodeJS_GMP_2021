const mockGroup = {
  id: 2,
  name: 'editors',
  permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD'],
};

const mockCreatedGroup = {
  id: 3,
  name: 'guests',
  permissions: ['READ', 'SHARE'],
};

const mockGroups = [
  {
    id: 1,
    name: 'admins',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD'],
  },
  { ...mockGroup },
  { ...mockCreatedGroup },
];

export { mockGroup, mockGroups, mockCreatedGroup };
