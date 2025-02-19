import { useState } from 'react';
import { ProfileValidationState } from './types';

export const useProfileValidation = () => {
  const [profileValidation, setProfileValidation] = useState<ProfileValidationState>({
    isDuplicateChecked: false,
    isUnique: false,
  });

  const updateNicknameDuplicateCheck = (isDuplicateChecked: boolean) => {
    setProfileValidation((prevState) => ({
      ...prevState,
      isDuplicateChecked,
    }));
  };

  const updateNicknameUniqueness = (isUnique: boolean) => {
    setProfileValidation((prevState) => ({
      ...prevState,
      isUnique,
    }));
  };

  return {
    state: {
      isDuplicateChecked: profileValidation.isDuplicateChecked,
      isUnique: profileValidation.isUnique,
    },
    update: {
      updateNicknameDuplicateCheck,
      updateNicknameUniqueness,
    },
  };
};
