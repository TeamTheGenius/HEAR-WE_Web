import type { UseFormReturn } from 'react-hook-form';
import { ProfileImageProps, UserInfoType } from '../../../entities/user/model/types';

export interface ProfileImageInputProps extends ProfileImageProps {
  formMethods: UseFormReturn<UserInfoType>;
}

export type SocialProvider = 'google' | 'naver' | 'kakao';

export interface ProfileValidationState {
  isDuplicateChecked: boolean;
  isUnique: boolean;
}

export interface ProfileValidationUpdate {
  updateNicknameDuplicateCheck: (isChecked: boolean) => void;
  updateNicknameUniqueness: (isUnique: boolean) => void;
}

export interface ProfileValidationReturn {
  state: ProfileValidationState;
  update: ProfileValidationUpdate;
}
