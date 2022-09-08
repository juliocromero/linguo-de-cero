import "./navbar.scss";
import { useState, useRef } from "react";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../motionUtils";
import {  PROFILE_PIC_URL } from "../../requests";
import { FaCaretDown } from "react-icons/fa";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { signOutStart } from "../../redux/auth/auth.actions";
// import { getLocalStorageCurrentUser, removeUserAuth } from '../../shared/localStorage'

const Navbar = () => {
	const isScrolled = useScroll(70);
	const [genresNav, setGenresNav] = useState(false);
	const [profileNav, setProfileNav] = useState(false);
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	const currentUser = useSelector(selectCurrentUser);
	// const currentUser = getLocalStorageCurrentUser();
	const dispatch = useDispatch();

	useOutsideClick(genresNavRef, () => {
		if (genresNav) setGenresNav(false);
	});
	useOutsideClick(profileNavRef, () => {
		if (profileNav) setProfileNav(false);
	});

	return (
		<>
			<motion.nav
				className={`Navbar ${isScrolled && "Navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				
				
				<div className="Navbar__secondarynav">
					<div className="Navbar__navitem">
						<Searchbar />
					</div>
					<div className="Navbar__navitem">
						<div
							className={`Navbar__navprofile ${profileNav && "active"}`}
							onClick={() => setProfileNav(!profileNav)}
						>
							<img
								className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
								src={currentUser && currentUser.photoURL ? currentUser.photoURL : PROFILE_PIC_URL}
								alt="Profile Picture"
							/>
							<FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
							<div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`}>
								{profileNav && (
									<ul
										className="Navbar__navprofile--content-wrp"
										ref={profileNavRef}
									>
										{currentUser && (
											<li
												className="Navbar__navlinks--link"
												onClick={() => {dispatch(signOutStart())}}
												// onClick={() => {removeUserAuth(); }}
												// onClick={() => {removeUserAuth(); dispatch(signOutStart())}}
											>
												Sign Out
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default Navbar;
