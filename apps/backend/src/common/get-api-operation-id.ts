interface GetApiOperationIdParams {
  apiScope: 'admin' | 'store';
  verb: 'list' | 'get' | 'create' | 'update' | 'delete' | 'login' | 'register';
  noun: string;
}

export function getApiOperationId(params: GetApiOperationIdParams) {
  return `${params.apiScope}${
    params.verb[0].toUpperCase() + params.verb.substring(1)
  }${params.noun[0].toUpperCase()}${params.noun.substring(1)}`;
}
