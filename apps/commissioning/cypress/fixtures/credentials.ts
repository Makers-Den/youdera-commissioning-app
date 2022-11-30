export type User = {
  email: string,
  password: string
}
export const credentials: { [k: string]: User } = {
  electrician: {
    email: 'elec@trician.com',
    password: 'electrician123',
  },
  roofer: {
    email: 'roo@fer.com',
    password: 'roofer123',
  }
}