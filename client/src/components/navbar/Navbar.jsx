import { useState } from "react";
import { Search } from "@material-ui/icons";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <span onClick={() => navigate("/")}>Homepage</span>
                    <span onClick={() => navigate("/series")}>Series</span>
                    <span onClick={() => navigate("/movies")}>Movies</span>
                    <span onClick={() => navigate("/trending")}>Trending</span>
                </div>
                <div className="right">
                    <Search onClick={() => navigate("/search")} className="icon" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;