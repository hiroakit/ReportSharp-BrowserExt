/**
 * Azure DevOps
 */
export class AzureDevOps {
  /**
   * Constructor
   */
  constructor() {

  }

  addButton() {	
	const observer = new MutationObserver(records => {
	  var record = records[0]
	  if(record.addedNodes.length > 0){
		if (record.addedNodes[0].className == "info-text-wrapper"){
		  var html = '<button>Copy title as Markdown</button>'
		  var ticketHeaderElement = document.querySelector("div.info-text-wrapper")
		  if(ticketHeaderElement != null){
			ticketHeaderElement.insertAdjacentHTML('beforeend', html)
		  }

		  ticketHeaderElement.lastChild.addEventListener("mouseup", (event) => {
			AzureDevOps.prototype.copyTitle()
		  })		  
		}
	  }
	})

	var body = document.querySelector("body")
	observer.observe(body, {
	  childList: true,
	  subtree: true
	})
  }

  copyTitle() {
	const selectorA = "div.work-item-view.new-work-item-view div.work-item-form-main-header div.workitemcontrol.work-item-control.work-item-form-id.initialized > span"
	const selectorB = "div.work-item-view.new-work-item-view div.work-item-form-main-header div.workitemcontrol.work-item-control.work-item-form-title.initialized > div > div > input"
	const selectorC = "div.workitem-info-bar > div > a"

	var type = document.querySelector("div.workitem-info-bar > div.info-text-wrapper > span > div > i").getAttribute("aria-label")
	if(type == "Product Backlog Item"){
	  type = "PBI"
	}
	
	var number = document.querySelector(selectorA).textContent
	var title = document.querySelector(selectorB).value

	var encoder = new TextEncoder("utf-8")
    var utf8Array = encoder.encode(title)
    var decoder = new TextDecoder("utf-8")
    var decodedText = decoder.decode(utf8Array)
	if(decodedText.length > 14){
	  title = decodedText.substr(0, 14) + '...'
	}

	var url = document.querySelector(selectorC).href
	var result = ("[" + type + " " + number + " " + title + "]" + "(" + url + ")")
	navigator.clipboard.writeText(result)
  }
}
