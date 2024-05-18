import { toast } from "react-toastify";

export class Toaster {
  static Success(message: string, timer = 1000) {
    toast(message, { type: "success", autoClose: timer });
  }

  static Error(message: string, timer = 1000) {
    toast(message, { type: "error", autoClose: timer });
  }
}
