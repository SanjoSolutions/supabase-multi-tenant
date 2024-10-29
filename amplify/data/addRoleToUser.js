import { util } from '@aws-appsync/utils'

export function request(ctx) {
  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({
      userId: ctx.args.userId,
      tenantId: ctx.args.tenantId,
    }),
    update: {
      expression: 'ADD membershipRoles :membershipRole',
      expressionValues: {
        ':membershipRole': util.dynamodb.toMapValues(ctx.args.role),
      },
    },
  }
}

export function response(ctx) {
  return ctx.result
}
