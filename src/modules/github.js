import { Markdown } from './markdown.js'
import { OrgMode } from './orgmode.js'

/**
 * GitHub
 */
export class GitHub {
  /**
   * Constructor
   */
  constructor() {

  }

  static validDomain(url) {
	if (url == null) {
	  return false
	}
	const domain = "https://github.com"
    return url.includes(domain)
  }
  
  addCopyTitleButtonForIssue() {
	var element = document.querySelector("#partial-discussion-header > div.gh-header-show > div > h1")
	if (element == null) {
	  return
	}

	var html = "<button>Copy title as Markdown</button>"	
	element.insertAdjacentHTML("beforeend", html)
	element.lastChild.addEventListener("mouseup", (event) => {
	  let titleElement = document.querySelector("#partial-discussion-header > div.gh-header-show > div > h1 > span.js-issue-title")
	  let numberElement = document.querySelector("#partial-discussion-header > div.gh-header-show > div > h1 > span.f1-light.text-gray-light")

	  let number = numberElement.textContent	  	  
	  let title = titleElement.textContent.trim()
	  let url = document.URL

	  var text = ""	  
	  if (ReportSharp.config.format == "orgmode"){
		var writer = new OrgMode()
		text = writer.makeTitle(number + " " + title, url)
	  } else {
		var writer = new Markdown()
		text = writer.makeTitle(number + " " + title, url)		
	  }
	  
	  navigator.clipboard.writeText(text)
	})	
  }  
}
