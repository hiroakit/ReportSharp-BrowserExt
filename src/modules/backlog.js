/**
 * Backlog
 */
export class Backlog {
  /**
   * Constructor
   */
  constructor() {

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
	  let title = titleElement.textContent
	  let url = linkElement.href

	  var text = ("[" + number + " " + title + "]" + "(" + url + ")")	  
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
	  let title = breadcrumbs[breadcrumbs.length - 1].textContent
	  let url = document.URL
	  
	  var text = ("[" + title + "]" + "(" + url + ")")	  
	  navigator.clipboard.writeText(text)
	})	
  }  
}
