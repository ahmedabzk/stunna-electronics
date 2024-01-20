import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open}) {

    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }

        return () => {
            modal.close();
        }
    }, [open])
    
    return createPortal(
      <dialog
        ref={dialog}
        className="w-[400px] h-[100px] flex flex-col justify-center items-center gap-4"
      >
        {children}
      </dialog>,
      document.getElementById("modal")
    );

}