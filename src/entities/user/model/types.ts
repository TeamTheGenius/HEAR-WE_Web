export interface ProfileImageProps {
  size: 'small' | 'medium' | 'large';
  src?: string;
  alt?: string;
  className?: string;
}

export interface UserInfoType {
  image: FileList;
  nickname: string;
}
