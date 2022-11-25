import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LinkItem from "./LinkItem";
import classNames from "classnames";
import logo from "../assets/images/logo.svg";
import menuIcon from "../assets/images/menu-icon.svg";
import useAuthContext from "../hooks/useAuthContext";
import Button from "./Button";
import axios from "../axios";

export default function Nav() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScreenMd, setIsScreenMd] = useState(false);
    const [isNavActive, setNavActive] = useState(false);
    const [linksBoxHeight, setLinksBoxHeight] = useState(0);

    const linksBox = useRef(null);
    const linksContainerClasses = classNames(
        "w-full md:w-auto h-0 overflow-hidden transition-all duration-300 ease-in-out",
        "md:h-auto md:overflow-visible md:flex md:items-center"
    );

    const navClasses = classNames(
        "fixed top-0 left-0 w-full z-[99] transition-all duration-300 shadow-[0_0_3px_rgb(3,39,44,0.15)] bg-white"
    );

    useEffect(() => {
        function isWindowWidthBiggerThanMd() {
            if (window.innerWidth >= 768) return setIsScreenMd(true);
            setIsScreenMd(false);
        }
        window.addEventListener("resize", isWindowWidthBiggerThanMd);
        return () => {
            // remove the events from the DOM when the components unmount
            // to prevent memory leak
            window.removeEventListener("resize", isWindowWidthBiggerThanMd);
        };
    }, []);

    useEffect(() => {
        if (!linksBox.current) return;
        const height = linksBox.current.clientHeight;
        setLinksBoxHeight(isMenuOpen ? height : 0);
    }, [isMenuOpen]);

    function toggleMenuOpen() {
        setIsMenuOpen((prevVal) => {
            return !prevVal;
        });
    }

    function logout() {
        localStorage.token = "";
        navigate("/auth/login");
    }
    return (
        <nav className={navClasses}>
            <div className="container">
                <div className="md:flex md:items-center md:justify-between md:h-[70px]">
                    {/* Top Bar */}
                    <div className="flex items-center justify-between h-[70px] md:h-auto md:grow-0">
                        <Link href="/" className="inline-block w-[111px]">
                            <img src={logo} alt="Logo" />
                        </Link>
                        <div
                            onClick={toggleMenuOpen}
                            className="cursor-pointer md:hidden"
                        >
                            <img
                                className="w-[24px]"
                                src={menuIcon}
                                alt="Menu"
                            />
                        </div>
                    </div>
                    {/* Links Container */}
                    <div
                        className={linksContainerClasses}
                        style={{
                            height: isScreenMd ? "100%" : linksBoxHeight,
                        }}
                    >
                        <div
                            ref={linksBox}
                            className="md:flex md:gap-[28px] md:items-center"
                        >
                            <ul className="md:flex md:gap-6 md:items-center">
                                <LinkItem href="/" label="Home" />
                                <Button onClick={logout}>Logout</Button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
