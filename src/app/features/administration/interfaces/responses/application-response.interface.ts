export interface ApplicationResponse {
  id: number;
  cleintId: string;
  name: string;
  description: string;
  launchUrl: string;
  clientSecret: string;
  isConfidential: boolean;
  userProfile: string;
  isActive: boolean;
  createdAt: string;
}
