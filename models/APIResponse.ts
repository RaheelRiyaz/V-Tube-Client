export class APIResponse<T> {
  isSuccess!: boolean;
  message!: string;
  statusCode!: number;
  result!: T | null;
}
