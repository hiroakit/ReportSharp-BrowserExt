import { Markdown } from './markdown.js'
import { OrgMode } from './orgmode.js'

/**
 * Backlog
 */
export class Backlog {
  /**
   * Constructor
   */
  constructor() {

  }

  static validDomain(url) {
	if (url == null) {
	  return false
	}

	const pattern = "http(s)?://([\\\w-]+\\\.)(backlog.)(com|jp)"
	var regexp = new RegExp(pattern);
	
	return regexp.test(url);
  }
    
  addCopyTitleButtonForTicket() {
	var ticketHeaderElement = document.querySelector("div.ticket__header > div.ticket__key.-has-button")
	if(ticketHeaderElement == null){
	  return
	}

	var html = "<button>Copy title as Markdown</button>"
	ticketHeaderElement.insertAdjacentHTML("afterbegin", html)
	ticketHeaderElement.firstChild.addEventListener("mouseup", (event) => {
	  let headerElement = document.querySelector("div.ticket__header > div.ticket__key.-has-button")
	  let numberElement = headerElement.querySelector("span.ticket__key-number")
	  let titleElement = document.querySelector("#summary > span")
	  let linkElement = document.querySelector("#editIssueButton")

	  let number = numberElement.textContent
	  let title = titleElement.textContent.trim()
	  let url = linkElement.href

	  var text = ""	  
	  if (ReportSharp.config.format == "orgmode") {
		var writer = new OrgMode()
		text = writer.makeTitle(number + " " + title, url)
	  } else {
		var writer = new Markdown()
		text = writer.makeTitle(number + " " + title, url)		
	  }
	  
	  navigator.clipboard.writeText(text)
	})
  }

  addCopyTitleButtonForWiki() {
	var element = document.querySelector("#mainTitle")	
	if (element == null) {
	  return
	}

	var html = "<button>Copy title as Markdown</button>"	
	element.insertAdjacentHTML("beforeend", html)
	element.lastChild.addEventListener("mouseup", (event) => {
	  let breadcrumbs = [...document.querySelector("#mainTitle").getElementsByClassName("breadcrumbs__item")]
	  let title = breadcrumbs[breadcrumbs.length - 1].textContent.trim()
	  let url = document.URL
	  
	  var text = ("[" + title + "]" + "(" + url + ")")	  
	  navigator.clipboard.writeText(text)
	})	
  }  
}
