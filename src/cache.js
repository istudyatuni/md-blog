/**
 * Functions for save html in localStorage
 * Key: path to file
 * Data:
 * 	- hash: hash of whole markdown file
 * 	- content: resulting html
 */


var storageEnabled = window.localStorage ? true : false;

/**
 * djb2 hash function
 * Links:
 *   http://www.cse.yorku.ca/~oz/hash.html
 *   https://stackoverflow.com/a/7616484
 * @param  {String} str Input string
 * @return {Number}     Hash of input string
 */
export function hashString(str) {
	let hash = 0, i, chr
	if (str.length === 0) return hash;
	Array.from(str)
		.forEach(e => {
			hash = (hash * 31 + e.charCodeAt(0)) | 0
		});
	return hash;
}

export function saveData(path, hash, html) {
	if (!storageEnabled) return;

	localStorage.setItem(path, JSON.stringify({
		hash,
		content: html,
	}))
}

function getData(path) {
	if (!storageEnabled) return;

	return JSON.parse(localStorage.getItem(path))
}

export function checkHash(path, hash) {
	let data = getData(path)

	if (data === null) {
		return null
	}
	if (data.hash === hash) {
		return data.content
	}
	return null
}
