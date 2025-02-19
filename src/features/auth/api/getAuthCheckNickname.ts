import { publicClient } from '../../../shared/api/config';

export const getAuthCheckNickname = async (nickname: string) => {
  const { data: response } = await publicClient.get(`/auth/check-nickname`, {
    params: { nickname },
  });

  const isAvailable = response.resultCode === 200;

  return {
    isAvailable: isAvailable,
  };
};
