import { Storage } from './modules/storage.js'
import { AzureDevOps } from './modules/azuredevops.js'
import { Backlog } from './modules/backlog.js'
import { GitHub } from './modules/github.js'

window.ReportSharp = { config : null }

async function main() {
  window.ReportSharp.config = await Storage.loadConfig();

  if (AzureDevOps.validDomain(document.URL)) {
	const azuredevops = new AzureDevOps()
	azuredevops.addButton()
	azuredevops.addCopyMenuButton()
	azuredevops.addExportButton()
  }

  if (Backlog.validDomain(document.URL)) {
	const backlog = new Backlog()
	backlog.addCopyTitleButtonForTicket()
	backlog.addCopyTitleButtonForWiki()	
  }

  if (GitHub.validDomain(document.URL)) {
	const github = new GitHub()
	github.addCopyTitleButtonForIssue()
  }  
}

window.addEventListener('load', function(){
  main()
})

