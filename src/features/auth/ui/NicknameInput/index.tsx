import { useWatch, type UseFormReturn } from 'react-hook-form';
import { TextInput } from '../../../../shared/ui/TextInput';
import { UserInfoType } from '../../../../entities/user/model/types';
import { getAuthCheckNickname } from '../../api/getAuthCheckNickname';
import { ProfileValidationReturn } from '../../model/types';
import { REGEX, VALIDATION_MESSAGES } from '../../../../shared/constants/userValidation';
import { AxiosError } from 'axios';

interface NicknameInputProps {
  formMethods: UseFormReturn<UserInfoType>;
  currentNickname?: string;
  profileValidation: ProfileValidationReturn;
}

function NicknameInput({ formMethods, currentNickname = '', profileValidation }: NicknameInputProps) {
  const {
    register,
    formState: { errors },
    trigger,
    setError,
    control,
  } = formMethods;

  const {
    update: { updateNicknameDuplicateCheck, updateNicknameUniqueness },
    state: { isUnique },
  } = profileValidation;

  const whatchedNickname = useWatch({
    control,
    name: 'nickname',
  });

  const isSameAsCurrent = whatchedNickname === currentNickname;

  const handleDupllicateCheck = async () => {
    const isValid = await trigger('nickname');
    if (!isValid) return;

    updateNicknameDuplicateCheck(true);

    try {
      const { isAvailable } = await getAuthCheckNickname(whatchedNickname);

      if (isAvailable) {
        updateNicknameUniqueness(true);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.code === 'NICKNAME_DUPLICATED') {
          setError('nickname', {
            message: VALIDATION_MESSAGES.nickname.duplicate,
          });
          updateNicknameUniqueness(false);
          return;
        }
      }
      throw error;
    }
  };

  const nicknameCheckRegister = register('nickname', {
    pattern: {
      value: REGEX.nickname,
      message: VALIDATION_MESSAGES.nickname.invalid,
    },
    required: VALIDATION_MESSAGES.nickname.required,
    onChange: () => {
      updateNicknameDuplicateCheck(false);
      updateNicknameUniqueness(false);
    },
  });

  return (
    <TextInput>
      <TextInput.Label isRequired={true}>닉네임</TextInput.Label>
      <TextInput.Input
        minLength={2}
        maxLength={20}
        placeholder="2-20자의 한글, 영문, 숫자로 입력해주세요"
        {...nicknameCheckRegister}
        onInvalid={(e) => e.preventDefault()}
        hasError={!!errors.nickname}
      />
      <TextInput.Button text="중복 확인" onClick={handleDupllicateCheck} disabled={isSameAsCurrent} type="button" />
      {isUnique ? (
        <TextInput.Message variant="success">사용 가능한 닉네임입니다.</TextInput.Message>
      ) : errors.nickname ? (
        <TextInput.Message variant="warning">{errors.nickname.message}</TextInput.Message>
      ) : null}
    </TextInput>
  );
}

export default NicknameInput;
