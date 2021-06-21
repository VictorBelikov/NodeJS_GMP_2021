const mockUser = {
  id: 7,
  login: 'aa399',
  password: 'newPppppppppppass1',
  age: 34,
  isDeleted: false,
};

const mockCreatedUser = {
  id: 44,
  login: 'login44',
  password: 'pass44',
  age: 44,
  isDeleted: false,
};

const mockUsers = [
  {
    id: 1,
    login: 'login1',
    password: 'pass1',
    age: 21,
    isDeleted: false,
  },
  {
    id: 2,
    login: 'login2',
    password: 'pass2',
    age: 22,
    isDeleted: false,
  },
  {
    id: 3,
    login: 'login3',
    password: 'pass3',
    age: 23,
    isDeleted: false,
  },
  {
    id: 6,
    login: 'aa3',
    password: 'newPppppppppppass1',
    age: 4,
    isDeleted: false,
  },
  { ...mockUser },
];

export { mockUsers, mockUser, mockCreatedUser };
