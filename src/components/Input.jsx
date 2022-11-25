import { useState } from "react";
import classNames from "classnames";
import { BiHide, BiShow } from "react-icons/bi";

export default function Input({ label, error, type = "text", ...props }) {
    const [filedType, setFiledType] = useState(type);
    function toggleShowPassword() {
        setFiledType((prev) => {
            if (prev === "password") return "text";
            return "password";
        });
    }
    const _inputClasses = classNames(
        "w-full text-base px-3 py-2 outline-none rounded-md",
        "border focus:border-accent",
        {
            "border-red-500": error,
            "pr-8": filedType === "password",
        }
    );
    return (
        <div className="mb-4 w-full">
            {label && (
                <label className="capitalize font-bold text-base block mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                <input className={_inputClasses} type={filedType} {...props} />
                {type === "password" && (
                    <span
                        onClick={toggleShowPassword}
                        className="absolute select-none right-2 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                    >
                        {filedType === "text" ? (
                            <BiHide size="20px" />
                        ) : (
                            <BiShow size="20px" />
                        )}
                    </span>
                )}
            </div>
            {error && (
                <span className="text-red-500 text-sm block w-full mt-1">
                    {error}
                </span>
            )}
        </div>
    );
}
