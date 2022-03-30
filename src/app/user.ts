export interface User{
    email?: string;
    nickname?: string;
    roles?: {
        user: boolean;
        manager: boolean;
        admin: boolean;
     }
  }