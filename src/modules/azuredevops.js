import { Markdown } from './markdown.js'
import { OrgMode } from './orgmode.js'

/**
 * Azure DevOps
 */
export class AzureDevOps {
  /**
   * Constructor
   */
  constructor() {

  }

  static validDomain(url) {
	if (url == null) {
	  return false
	}

	const pattern = "http(s)?://(dev.azure.com)"
	var regexp = new RegExp(pattern);
	
	return regexp.test(url);
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
  
  addCopyMenuButton(){
	var taskboard = document.getElementById("taskboard-table-body")
	var tiles = [...document.getElementsByClassName("tbTile")]
	tiles.forEach(function(tile) {
	  const observer = new MutationObserver(records => {
		var popup = document.getElementsByClassName("menu-popup")
		if(popup == null){
		  return
		}
		if(popup.length > 0){
		  popup = popup[0]
		}
	  
		const observer2 = new MutationObserver(records2 => {
		  let menu = document.getElementsByClassName("sub-menu")
		  if(menu != null && menu.length > 0){
			var html = '<li id="ext_copy-title" class="menu-item" tabindex="-1" role="menuitem" title="" aria-disabled="false" aria-posinset="2" aria-setsize="4"><span class="menu-item-icon bowtie-icon bowtie-link" aria-hidden="true"></span><span class="text" role="button">Copy title as Markdown</span><span class="html"></span></li>'
			menu[0].insertAdjacentHTML('beforeend', html);
			menu[0].lastChild.addEventListener("mouseup", (event) => {
			  // div.id-title-container
			  var titleContainer = event.currentTarget.parentElement.parentElement.parentElement.parentElement.firstElementChild.firstElementChild

			  var html_event = new Event( "mouseover", {"bubbles":true, "cancelable":true})
			  titleContainer.querySelector("span.clickable-title").dispatchEvent(html_event)

			  var type = titleContainer.querySelector("span > div > i").getAttribute("aria-label")
			  if(type == "Product Backlog Item"){
				type = "PBI"
			  }
			  
			  var number = titleContainer.querySelector("div.id").textContent
			  var title = titleContainer.querySelector("span.clickable-title").textContent
			  var encoder = new TextEncoder("utf-8")
			  var utf8Array = encoder.encode(title)
			  var decoder = new TextDecoder("utf-8")
			  var decodedText = decoder.decode(utf8Array)
			  if(decodedText.length > 14){
				title = decodedText.substr(0, 14) + '...'
			  }		  
			  var url = titleContainer.querySelector("div.title.ellipsis > a").href
			  
			  var result = ("[" + type + " " + + number + " " + title + "]" + "(" + url + ")")
			  navigator.clipboard.writeText(result)
			});
		  }
		})	

		observer2.observe(popup, {
		  childList: true
		})	
	  })
	  
	  observer.observe(tile, {
		childList: true
	  })
	})  
  }

  addExportButton(){
	var bar = document.getElementsByClassName("ms-CommandBar-primaryCommands")
	if (bar == null || bar.length < 1){
	  return
	}
	bar = bar[0]
	
	var html = '<div class="ms-CommandBarItem"><div><button type="button" class="ms-CommandBarItem-link" role="menuitem" aria-expanded="false" aria-label="Copy All PBI title" aria-haspopup="true" aria-setsize="7" aria-posinset="1" data-automation-id="commandBarOverflow">Copy All PBI</button></div></div>'
	bar.insertAdjacentHTML('beforeend', html);

	
	bar.lastChild.addEventListener("mouseup", (event) => {
	  var text = ""
	  
	  var rows = [...document.getElementsByClassName("taskboard-content-row")]
	  rows.forEach(function(row) {
		var element = row.children[1]

		var titleContainer = element.firstElementChild.firstElementChild
		var html_event = new Event( "mouseover", {"bubbles":true, "cancelable":true})
		titleContainer.querySelector("span.clickable-title").dispatchEvent(html_event)
		
		var type = titleContainer.querySelector("span > div > i").getAttribute("aria-label")
		if(type == "Product Backlog Item"){
		  type = "PBI"
		}
		
		var number = titleContainer.querySelector("div.id").textContent
		var title = titleContainer.querySelector("span.clickable-title").textContent
		var encoder = new TextEncoder("utf-8")
		var utf8Array = encoder.encode(title)
		var decoder = new TextDecoder("utf-8")
		var decodedText = decoder.decode(utf8Array)

		var url = titleContainer.querySelector("div.title.ellipsis > a").href
		var result = ("[" + type + " " + + number + " " + title + "]" + "(" + url + ")")
		text += result + "\n"
	  })
	  navigator.clipboard.writeText(text)
	})
  }
}
