import parse from './snarkdown.js'
import { parseFrontmatter } from './frontmatter.js'

const root = 'site/'
const rootFile = root + 'main'
const content = document.getElementById('content')

function applyFrontmatter(fm) {
	if (fm && Object.keys(fm).length === 0) {
		return
	}
	document.title = fm.title || document.title
}

function printError(code, text, url) {
	content.innerHTML = `<center><h2>${code}</h2>
	<p><i>${text}</i></p>
	<p>URL: <code>${url}</code></p>
	</center>`
	document.title = code
}

async function rendering(path) {
	const response = await fetch(path)
	if (response.ok) {
		const { fm, text } = parseFrontmatter(await response.text())
		applyFrontmatter(fm)
		content.innerHTML = parse(text)
	} else {
		printError(response.status, response.statusText, response.url)
	}
}

function reloading() {
	let hash = location.hash

	if (hash === '' || hash === '#/') {
		hash = rootFile
	} else {
		hash = root + hash.slice(2)
	}

	const path = hash + '.md'
	rendering(path)
}

reloading()

// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange
window.onhashchange = reloading
