interface IErrorMessage {
  message: string | undefined;
}
function ErrorMessage({ message }: IErrorMessage) {
  return <div className="text-red-500 font-semibold text-sm">{message}</div>;
}

export default ErrorMessage;
