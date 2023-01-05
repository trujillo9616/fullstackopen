export type Person = {
  name: string;
  number: string;
  id: number;
}

export type NotificationType = {
  message: string | null;
  type: 'success' | 'error' | 'info' | undefined;
}
