import classNames from "classnames";
import { useEffect, useState } from "react";
import { BiX, BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import RenderModals from "./RenderModals";

export default function Modal({
    isOpen = false,
    maxWidth = 450,
    position = "center",
    close,
    children,
}) {
    useEffect(() => {
        function closeWhenUserClickEscape(e) {
            if (e.key === "Escape") close();
        }
        window.addEventListener("keyup", closeWhenUserClickEscape);
        return () => {
            window.removeEventListener("keyup", closeWhenUserClickEscape);
        };
    });
    const _classes = classNames(
        "bg-white slide-down w-[95%] h-auto rounded-md my-[5%]",
        {
            "self-start": position === "start",
            "self-center": position === "center",
            "self-end": position === "end",
        }
    );

    if (!isOpen) return null;
    return (
        <RenderModals>
            <div className="fixed  z-[999] w-screen h-screen top-0 left-0 bg-black/20 flex justify-center">
                <div
                    style={{
                        maxWidth,
                    }}
                    className={_classes}
                >
                    <div className="flex justify-end p-2 gap-2 text-gray-600">
                        <div
                            onClick={close}
                            className="inline-block cursor-pointer p-1 rounded-sm bg-gray-50 hover:bg-gray-200"
                        >
                            <BiX size="20px" />
                        </div>
                    </div>
                    <div className="w-full p-4 md:p-6">{children}</div>
                </div>
            </div>
        </RenderModals>
    );
}
