// [TYPE] DTO definition for User entity
export interface User {
  id: number;
  username: string;
  email?: string;
  roles?: string[];
}