import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentCustomer = createParamDecorator(
  (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return {};
  },
);
