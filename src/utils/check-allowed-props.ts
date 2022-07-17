import { BadRequestException } from 'src/exceptions/bad-request';

export const checkAllowedProps = (targetObject: {}, props: string[]) => {
  for (let key in targetObject) {
    const propName = props.find((prop) => prop === key);

    // case: not allowed property was found
    if (propName === undefined)
      throw new BadRequestException('Object has forbidden property');
  }
};
