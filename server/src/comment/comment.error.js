'use strict';

const CommentError = {
  NotContent: () => {
    throw {
      code: 400,
      message: '댓글 내용을 입력하세요.',
    };
  },
  NotFound: () => {
    throw {
      code: 404,
      message: '존재하지 않는 댓글입니다.',
    };
  },
  Unauthorized: () => {
    throw {
      code: 401,
      message: '수정 또는 삭제 권한이 없는 댓글입니다.',
    };
  },
};

module.exports = CommentError;
