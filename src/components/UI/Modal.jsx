import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, className="", onCLose}){

    const dialog = useRef()

    useEffect(()=>{

        const modal = dialog.current
        if(open){
            modal.showModal()
        }

        return() => modal.close();
    }, [open]);

    return(
        createPortal(<dialog className={`modal ${className}`} ref={dialog} onClose={onCLose}>{children}</dialog>, document.getElementById("modal"))
    )
}