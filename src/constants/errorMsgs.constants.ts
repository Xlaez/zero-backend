export default {
  resourceNotCreated: 'resource could not be created',
  resourceNotDeleted: 'resource  could not be deleted',
  resourceNotUpdated: 'resource could not be updated',
  resourceNotFound: 'resource not found',
  requestFailed: 'request not successful',
  accountNotCreated: 'acount could not be created',
  accountNotFound: 'account not found',
  transactionFailed: 'transaction not successful',
  notAuthorized: 'you cannot access this resource, you are not authorized',
  notAuthenticated: 'you cannot access this resource, you are not authenticated',
  networkError: 'network error',
  uploadError: 'could not upload resource to server',
  mediaFileMissing: (type: string, formats: string[]) =>
    `upload a valid ${type} with ${formats.map((exts) => exts).join(', ')} formats`,
  credentialsWrong: (credentials: string | number) => `your ${credentials} are incorrect`,
  customMsg: (message: string) => `${message}`,
};
