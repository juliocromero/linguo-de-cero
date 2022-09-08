import "./playAnimation.scss"
import { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BASE_AUDIOS_URL } from "../../requests";
// import { TADUM_SOUND_URL } from "../../requests";
// import { useParams } from "react-router-dom";

const LinguooAnimationPlay = () => {

	const { audioName } = useParams();
	let history = useHistory();
	const soundRef = useRef(null);
	const handleTadum = () => {
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}

	useEffect(() => {
		handleTadum();
		setTimeout(() => {
			history.push('/browse')
		}, 592561134)
	}, [history])

	return (
			<div className='PlayAnimation__wrp'>
				<audio ref={soundRef} src={ BASE_AUDIOS_URL + audioName } />
				<span className="PlayAnimation__text">
					LINGUOO
				</span>
			</div>
	)
}

export default LinguooAnimationPlay
