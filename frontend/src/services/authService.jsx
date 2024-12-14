import { mockUsers } from '../utils/mockData';

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    setTimeout(() => {
      user ? resolve(user) : reject(new Error('Invalid credentials'));
    }, 500);
  });
};