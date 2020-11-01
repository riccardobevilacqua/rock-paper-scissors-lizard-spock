import { toSvg } from 'jdenticon';

export const generateUserId = () => Math.random().toString(36).substring(2, 15) + performance.now().toString();

export const generateAvatar = (input: string, size: number = 100) => toSvg(input, size);
