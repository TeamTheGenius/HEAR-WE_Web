import { publicClient } from '../../../shared/api/config';

export const postAuthSignup = async (userId: number, nickname: string) => {
  await publicClient.post('/auth/signup', {
    userId,
    nickname,
  });
};
