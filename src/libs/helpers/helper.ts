import { EJwtTokenTypes } from '../types/type';

export const getBlacklistedTokenKey = (
  tokenId: number,
  type: EJwtTokenTypes,
): string => {
  if (type === EJwtTokenTypes.ACCESS_TOKEN) {
    return `access-token-${tokenId}`;
  }
  return `refresh-token-${tokenId}`;
};
