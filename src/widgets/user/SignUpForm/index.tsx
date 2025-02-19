import { useForm } from 'react-hook-form';
import UserInfoForm from '../../../features/auth/ui/UserInfoForm';
import { UserInfoType } from '../../../entities/user/model/types';
import { useSearchParams } from 'react-router-dom';
import { getAuthProfileImage } from '../../../features/auth/api/getAuthProfileImage';
import { useEffect } from 'react';
import { makeSourceToFileList } from '../../../shared/helper/sourceToFileList';
import { useProfileValidation } from '../../../features/auth/model/useProfileValidation';
import { VALIDATION_MESSAGES } from '../../../shared/constants/userValidation';
import { postAuthSignup } from '../../../entities/user/api/postAuthSignup';

function SignUpForm() {
  const [searchParams] = useSearchParams();
  const formMethods = useForm<UserInfoType>({ defaultValues: { nickname: '', image: undefined }, mode: 'onBlur' });
  const profileValidation = useProfileValidation();

  const userId = Number(searchParams.get('id'));

  useEffect(() => {
    const loadProfileImage = async () => {
      const { fileEnv, source } = await getAuthProfileImage(userId);
      const fileList = makeSourceToFileList(fileEnv, source, 'profile-image.jpg');
      if (fileList) formMethods.setValue('image', fileList);
    };
    loadProfileImage();
  }, [userId, formMethods]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await formMethods.trigger();
    if (!isValid) return;

    if (!profileValidation.state.isDuplicateChecked) {
      formMethods.setError('nickname', {
        message: VALIDATION_MESSAGES.nickname.notCheck,
      });
      return;
    }

    if (!profileValidation.state.isUnique) {
      formMethods.setError('nickname', {
        message: VALIDATION_MESSAGES.nickname.duplicate,
      });
      return;
    }

    await postAuthSignup(userId, formMethods.getValues().nickname);
  };

  return (
    <UserInfoForm
      onSubmit={handleSubmit}
      formMethods={formMethods}
      profileValidation={profileValidation}
      submitButtonText="가입하기"
    />
  );
}

export default SignUpForm;
