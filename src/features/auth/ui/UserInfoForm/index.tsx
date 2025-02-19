import type { UseFormReturn } from 'react-hook-form';
import Button from '../../../../shared/ui/Button';
import NicknameInput from '../NicknameInput';
import ProfileImageInput from '../ProfileImageInput';
import styles from './index.module.scss';
import { UserInfoType } from '../../../../entities/user/model/types';
import { ProfileValidationReturn } from '../../model/types';

interface UserInfoFormProps {
  submitButtonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formMethods: UseFormReturn<UserInfoType>;
  profileValidation: ProfileValidationReturn;
}

function UserInfoForm({ onSubmit, formMethods, submitButtonText, profileValidation }: UserInfoFormProps) {
  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <ProfileImageInput size="large" formMethods={formMethods} />
      <NicknameInput formMethods={formMethods} profileValidation={profileValidation} />
      <Button variant="primary" size="large" text={submitButtonText} type="submit" />
    </form>
  );
}

export default UserInfoForm;
