import classNames from "classnames";

export default function Button({
    children,
    className = "null",
    rounded = "md",
    circler = false,
    fullWidth = false,
    loading = false,
    ...props
}) {
    const classes = classNames(
        "align-middle transition-colors duration-700",
        "bg-accent text-white hover:opacity-90",
        {
            [className]: className !== "null",
            ["rounded-md"]: rounded == "md",
            ["rounded-[30px]"]: rounded == "full" || circler,
            ["px-[30px] py-[14px]"]: !circler && rounded === "full",
            ["px-[20px] py-[9px]"]: !circler && rounded !== "full",
            ["w-[45px] h-[45px] flex items-center justify-center"]: circler,
            ["w-full block"]: fullWidth,
        }
    );
    return (
        <button className={classes} {...props}>
            {loading ? "Loading..." : children}
        </button>
    );
}
