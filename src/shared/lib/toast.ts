import { toast } from 'vue3-toastify'

export function showSuccess(message: string) {
  toast.success(message, { autoClose: 2000 })
}
