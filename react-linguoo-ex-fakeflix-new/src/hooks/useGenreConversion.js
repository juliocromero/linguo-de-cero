import { genresList } from "../dataConfig";

const useGenreConversion = genreIds => {
	if(genreIds){
		let listtest = genresList.filter(e => genreIds.includes(e.id)).map(e => e.name)
		return listtest;
	}
	return []
	
	/* genreIds
		.slice(0, 3)
		.map(genreId =>
			genresList
				.filter(el => el.id === genreId)
				.map(el => genresConvertedList.push(el.name))
		); */
	
};

export default useGenreConversion;
