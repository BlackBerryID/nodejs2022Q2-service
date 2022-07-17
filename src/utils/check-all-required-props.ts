import { BadRequestException } from 'src/exceptions/bad-request';

export const checkAllRequiredProps = (
  targetObject: {},
  exceptionMessage: string,
  props: string[],
) => {
  props.forEach((prop) => {
    if (!targetObject.hasOwnProperty(prop))
      throw new BadRequestException(exceptionMessage);
  });

  // case: targetObject has other properties (except required ones)
  if (Object.keys(targetObject).length !== props.length)
    throw new BadRequestException('Object has forbidden property');
};
