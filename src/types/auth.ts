import { AvailableLangs, UserTargetLang } from './langs';

export type UserRoleType = 'admin' | 'editor' | 'teacher' | 'student';

export interface UserProfile {
  id: string;
  role: UserRoleType;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  nativeLang: AvailableLangs | null;
  targetLangs: UserTargetLang[] | null;
}
