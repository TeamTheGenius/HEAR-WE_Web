import ProfileImage from '../../../../entities/user/ui/ProfileImage';
import Icon from '../../../../shared/ui/Icon';
import styles from './index.module.scss';
import type { ProfileImageInputProps } from '../../model/types';
import { useFileInput } from '../../../../shared/hooks/useFileInput';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';

function ProfileImageInput({ formMethods, ...profileImageProps }: ProfileImageInputProps) {
  const {
    register,
    formState: { errors },
    control,
  } = formMethods;
  const { handlers, fileRegister } = useFileInput(register, 'image');
  const [previewImage, setPreviewImage] = useState('');

  const watchedFile = useWatch({
    control,
    name: 'image',
  });

  useEffect(() => {
    if (!watchedFile) return;
    const image = URL.createObjectURL(watchedFile[0]);
    setPreviewImage(image);

    return () => {
      URL.revokeObjectURL(image);
    };
  }, [watchedFile]);

  return (
    <button type="button" onClick={handlers.handleInputClick} className={styles.editButton}>
      <ProfileImage src={previewImage} {...profileImageProps} />
      <div className={styles.editIcon}>
        <Icon icon="pencil" fill="text-secondary" iconSize="20" />
      </div>
      <input
        type="file"
        accept="image/*"
        {...fileRegister}
        ref={handlers.handleFileInputRef}
        className={styles.editInput}
      />
      {errors.image && <p className={styles.errorText}>{errors.image.message}</p>}
    </button>
  );
}

export default ProfileImageInput;
