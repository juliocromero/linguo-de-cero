import "./auth.scss";
import { useState } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerOne, authFadeInUpVariants, modalVariants, authPageFadeInVariants } from "../../motionUtils";
import { LOGO_URL , BACKGROUND_LOGIN_URL } from "../../requests.js";
import { useSelector } from "react-redux";
import { selectAuthErrors } from "../../redux/auth/auth.selectors";
import InputSelect from "../../components/Select/Select";
import {useTranslation} from 'react-i18next'
// import Select from "react-select";

const Auth = () => {
	const [isSignedUp, setIsSignedUp] = useState(true);
	const authError = useSelector(selectAuthErrors);
	const [t] = useTranslation("global")
	return (
			<motion.div
			className="Auth"
			variants={authPageFadeInVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="Auth__opacityLayer" />
			 <div className="Auth__bgLayer" style={{ backgroundImage: `url(${BACKGROUND_LOGIN_URL})` }} /> 
			
			<Link to="/" className="Auth__logo">
				<img className="Auth__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
			</Link>
			
			<InputSelect/>	
			<motion.div
				className="Auth__content"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				
				<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit">
					<motion.h2 variants={authFadeInUpVariants} className="Auth__content--title">
						{isSignedUp ? t('header.SIGN_IN') : t("header.CREAR_ACCOUT")}
					</motion.h2>
					{/* <motion.small variants={authFadeInUpVariants} className="Auth__content--disclaimer">
						{`Pay attention: this is not the original Netflix ${isSignedUp ? "sign in" : "sign up"}. Don't insert your real credentials here!`}
					</motion.small> */}
					{isSignedUp ? <SignIn /> : <SignUp />}
					{authError && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{authError}</motion.p>}
					<motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" />
					<motion.small variants={authFadeInUpVariants} className="Auth__content--toggleView">
					{isSignedUp ? t('header.HAVENT') : ''}
						<span className="toggler" onClick={() => setIsSignedUp(!isSignedUp)}>
						{ isSignedUp ? t('header.REGIST') : t('header.LOGIN') }
						</span>
					</motion.small>	
			     	
				</motion.div>
			</motion.div>
	   </motion.div>	
	);
};

export default Auth;
