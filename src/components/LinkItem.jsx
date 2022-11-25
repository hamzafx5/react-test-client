import classNames from "classnames";
import { Link } from "react-router-dom";

export default function LinkItem({ label, href }) {
    const classes = classNames(
        "uppercase text-[13px] hover:text-accent font-semibold tracking-wider",
        "block md:inline-block py-[12px] px-2 md:p-0 transition-colors duration-200"
    );
    return (
        <li className="block w-full md:inline-block md:w-auto">
            <Link to={href} className={classes}>
                {label}
            </Link>
        </li>
    );
}
