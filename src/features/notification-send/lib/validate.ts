export function validateTitle(value: string) {
  return value.trim().length > 0 || 'titleRequired';
}

export function validateBody(value: string) {
  return value.trim().length > 0 || 'bodyRequired';
}

export function validateRecipients(value: number[]) {
  return value.length > 0 || 'recipientsRequired';
}
