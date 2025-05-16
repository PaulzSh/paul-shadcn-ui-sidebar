import * as React from 'react';

type ToastType = 'default' | 'destructive';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  className?: string;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (options: {
    title: string;
    description?: string;
    variant?: ToastType;
    className?: string;
  }) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(
    ({
      title,
      description,
      variant = 'default',
      className = '',
    }: {
      title: string;
      description?: string;
      variant?: ToastType;
      className?: string;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      
      setToasts((currentToasts) => [
        ...currentToasts,
        { id, title, description, type: variant, className },
      ]);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        dismissToast(id);
      }, 5000);
    },
    []
  );

  const dismissToast = React.useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismissToast }}>
      {children}
      <ToastViewport toasts={toasts} dismissToast={dismissToast} />
    </ToastContext.Provider>
  );
}

function ToastViewport({
  toasts,
  dismissToast,
}: {
  toasts: Toast[];
  dismissToast: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} dismissToast={dismissToast} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  dismissToast,
}: {
  toast: Toast;
  dismissToast: (id: string) => void;
}) {
  const bgColor = toast.type === 'destructive' ? 'bg-red-50' : 'bg-green-50';
  const textColor = toast.type === 'destructive' ? 'text-red-800' : 'text-green-800';

  return (
    <div
      className={`${bgColor} ${textColor} ${toast.className} rounded-md p-4 shadow-lg border border-gray-200 min-w-[300px] flex justify-between items-start`}
    >
      <div>
        <h3 className="font-medium">{toast.title}</h3>
        {toast.description && (
          <p className="text-sm mt-1">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => dismissToast(toast.id)}
        className="text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}