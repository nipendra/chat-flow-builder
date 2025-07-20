import * as React from "react"

export type Toast = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive" | "watermelon"
}

type ToastState = {
  toasts: Toast[]
}

let toastId = 0
const generateId = () => `toast-${++toastId}`

// Simple global state
const listeners = new Set<(state: ToastState) => void>()
let state: ToastState = { toasts: [] }

const notify = () => {
  listeners.forEach(listener => listener(state))
}

const addToast = (toast: Omit<Toast, "id">) => {
  const newToast: Toast = {
    ...toast,
    id: generateId()
  }
  
  state = {
    toasts: [...state.toasts, newToast]
  }
  
  notify()
  
  setTimeout(() => {
    dismiss(newToast.id)
  }, 3000)
  
  return {
    id: newToast.id,
    dismiss: () => dismiss(newToast.id),
    update: (props: Partial<Toast>) => {
      state = {
        toasts: state.toasts.map(t => 
          t.id === newToast.id ? { ...t, ...props } : t
        )
      }
      notify()
    }
  }
}

const dismiss = (toastId?: string) => {
  state = {
    toasts: toastId 
      ? state.toasts.filter(t => t.id !== toastId)
      : []
  }
  notify()
}

export const toast = addToast

export const useToast = () => {
  const [currentState, setState] = React.useState(state)
  
  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])
  
  return {
    toasts: currentState.toasts,
    toast: addToast,
    dismiss
  }
}