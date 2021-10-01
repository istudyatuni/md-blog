const sep = '---'
const yamlLine = /^([\w-_]+):\s+(.+)$/

/**
 * Parse simple subset of YAML
 * One key on each line
 * @param  {Array[String]} content
 * @return {Object}                 Parsing result
 */
function parseYaml(content) {
	let result = {}
	content.forEach(e => {
		const ym = e.match(yamlLine)
		if (ym !== null) {
			result[ym[1]] = ym[2]
		}
	})
	return result
}

/**
 * Parse YAML front matter from markdown
 * @param  {String}         text File content
 * @return {Object, String}      YAML as object and Markdown content
 */
export function parseFrontmatter(text) {
	let lines = text.split('\n')
	if (lines[0] !== sep) {
		return { fm: {}, text }
	}

	const fmEndInd = 1 + lines.slice(1).findIndex(e => e === sep)
	if (fmEndInd === 0) {  // 0 bc 1 + (-1)
		throw 'No closing ---'
	}

	const fm = lines.slice(1, fmEndInd)
	const md = lines.slice(fmEndInd + 1)

	return {
		fm: parseYaml(fm),
		text: md.join('\n'),
	}
}
