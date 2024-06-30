// src/components/SidePanel.tsx
import clsx from "clsx";
import { FC, ReactNode } from "react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SidePanel: FC<SidePanelProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={clsx(
          `fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300`,
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div
        className={clsx(
          `fixed inset-y-0 right-0 z-50 bg-white dark:bg-gray-800 w-2/3 md:w-1/3 shadow-lg transition-transform duration-300 transform overflow-auto`,
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          >
            &#10005;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default SidePanel;
