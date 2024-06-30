// src/components/Dialog.tsx

import { useEffect, useRef, useState } from "react";

export interface DialogProps {
  allowClose?: boolean;
  contents?: React.ReactNode;
  open: boolean;
  dialogStateChange?: (open: boolean) => void;
}

export default function Dialog({
  allowClose = true,
  contents,
  open,
  dialogStateChange = () => {},
}: DialogProps) {
  const [showModal, setShowModal] = useState(open);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const handleClose = () => {
    if (allowClose) {
      updateDialogState(false);
    }
  };

  function updateDialogState(open: boolean) {
    setShowModal(open);
    dialogStateChange(open);
  }

  return showModal ? (
    <>
      <div className="fixed inset-5 z-30 bg-gray-lightdialog dark:bg-gray-darkdialog opacity-25 drop-shadow-2xl"></div>
      <div
        onClick={({ target }) => {
          if (dialog.current && !dialog.current.contains(target as Node)) {
            handleClose();
          }
        }}
        onKeyDown={({ key }) => {
          if (key === "Escape") {
            handleClose();
          }
        }}
        className="flex justify-center items-start mt-12 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen"
        tabIndex={-1}
      >
        <div className="relative my-6 mx-auto w-128 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-200 to-green-600 rounded-lg blur-lg opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-2000"></div>
            <div
              ref={dialog}
              className="relative p-6 bg-gray7 rounded-lg grid place-content-center"
            >
              {contents}
              <button
                onClick={handleClose}
                className="absolute top-0 right-0 p-2 text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Close dialog"
              >
                &#10005;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}
