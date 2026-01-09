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
  createdAt: string;
  updatedAt: string;
  userApplications: UserApplicationResponse[];
}

export interface UserApplicationResponse {
  id: string;
  userId: string;
  applicationId: number;
  createdAt: string;
}
