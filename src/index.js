import parse from './third/snarkdown.js'
import { parseFrontmatter } from './frontmatter.js'
import { saveData, hashString, checkHash } from './cache.js'

const hashPrefix = '#/'
const root = 'site/'
const rootFile = root + 'main'
const content = document.getElementById('content')

let isRedirect = false

function applyFrontmatter(fm) {
	if (fm && Object.keys(fm).length === 0) {
		return
	}
	document.title = fm.title || document.title
}

function showError(code, text, url) {
	content.innerHTML =
	`<center>
		<h2>${code}</h2>
		<p><i>${text}</i></p>
		<p>URL: <code>${url}</code></p>
	</center>`
	document.title = code
}

function caching(path, fileContent, text) {
	const hash = hashString(fileContent)
	const data = checkHash(path, hash)

	if (data !== null) {
		content.innerHTML = data
	} else {
		const html = parse(text)
		content.innerHTML = html
		saveData(path, hash, html)
	}
}

async function fetching(path) {
	isRedirect = false

	const response = await fetch(path)
	if (response.ok) {
		const responseContent = await response.text()
		const { fm, text } = parseFrontmatter(responseContent)

		if (fm.redirect) {
			isRedirect = true
			window.location.replace(hashPrefix + fm.redirect)
			return
		}

		applyFrontmatter(fm)
		caching(path, responseContent, text)
	} else {
		showError(response.status, response.statusText, response.url)
	}
}

function reloading() {
	let hash = location.hash

	if (hash === '' || hash === hashPrefix) {
		hash = rootFile
	} else {
		hash = root + hash.slice(2)
	}

	const path = hash + '.md'
	fetching(path)
}

reloading()

// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange
window.onhashchange = reloading
