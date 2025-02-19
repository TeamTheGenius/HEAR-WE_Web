export const REGEX = {
  nickname: /^[가-힣a-zA-Z0-9]{2,20}$/,
};

export const VALIDATION_MESSAGES = {
  nickname: {
    required: '닉네임을 입력해주세요',
    invalid: '닉네임은 2-20자의 한글, 영문, 숫자만 가능합니다.',
    duplicate: '이미 사용 중인 닉네임입니다.',
    notCheck: '닉네임 중복 검사를 해주세요',
  },
};
