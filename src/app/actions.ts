'use server';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: any[];
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export async function getUser(userId: number): Promise<User> {
  const resp = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);

  const user = await resp.json();
  console.log({ user });

  return user;
}
