import { BadRequestException } from 'src/exceptions/bad-request';

export const checkAllRequiredProps = (targetObject: {}, ...args: string[]) => {
  args.forEach((arg) => {
    if (!targetObject.hasOwnProperty(arg))
      throw new BadRequestException('Login and password are required');
  });
};
