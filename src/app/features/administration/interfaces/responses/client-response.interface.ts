export interface ClientResponse {
  id: number;
  name: string;
  clientKey: string;
  description: string | null;
  baseUrl: string;
  defaultRole: string;
  isActive: boolean;
  date: string;
}
