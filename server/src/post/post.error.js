'use strict';

/* 게시물 API 관련 예외 처리입니다. */
const PostError = {
  NotContent: () => {
    throw {
      code: 400,
      message: '게시물의 내용을 입력하세요.',
    };
  },
  NotImage: () => {
    throw {
      code: 400,
      message: '이미지 파일을 선택하세요.',
    };
  },
  NotFound: () => {
    throw {
      code: 404,
      message: '존재하지 않는 게시물입니다.',
    };
  },
  Unauthorized: () => {
    throw {
      code: 401,
      message: '수정 또는 삭제 권한이 없는 게시물입니다.',
    };
  },
};

module.exports = PostError;
