const { parse } = require('graphql')

const document = parse(
  'query ($tenantId: ID, $sortDirection: ModelSortDirection, $id: ModelIDKeyConditionInput, $filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {\n  listTodos(\n    tenantId: $tenantId\n    sortDirection: $sortDirection\n    id: $id\n    filter: $filter\n    limit: $limit\n    nextToken: $nextToken\n  ) {\n    items {\n      id\n      tenantId\n      content\n      createdAt\n      updatedAt\n    }\n    nextToken\n    __typename\n  }\n}\n'
)
debugger
