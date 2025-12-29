export interface UserResponse {
  id: string;
  login: string;
  password: string;
  fullName: string;
  externalKey: string;
  relationKey: string;
  email: null;
  isActive: boolean;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  accesses: UserApplicationResponse[];
}

export interface UserApplicationResponse {
  id: string;
  userId: string;
  applicationId: number;
  createdAt: string;
  updatedAt: string;
}
