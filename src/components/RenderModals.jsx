import { createPortal } from "react-dom";
const ModalsRoot = document.getElementById("modals-container");

export default function RenderModals({ children }) {
    return createPortal(children, ModalsRoot);
}
