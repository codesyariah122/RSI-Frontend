// Format Slug Untuk Route Page Tertentu | codesyariah122
// Puji Ermanto 2022 - aka : codesyariah

const StringToSlug = (str) => {
	 str = str.replace(/^\s+|\s+$/g, ''); // trim
	 str = str.toLowerCase();

	 str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes    
    	return str
}

const SlugProfileName = (str) => {
	str = str.replace(/^\s+|\s+$/g, ''); // trim
	str = str.toLowerCase();

	str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '') // collapse whitespace and replace by -
        .replace(/-+/g, ''); // collapse dashes    
  return str
}

const ValidYtString = (str) => {
	str = str.substr(0, 30)
	return str
}


export default ({ app }, inject) => {
  inject('slug', StringToSlug)
  inject('username', SlugProfileName)
  inject('ytString', ValidYtString)
}
