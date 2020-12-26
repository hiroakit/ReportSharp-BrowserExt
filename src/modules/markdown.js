/**
 * Markdown
 */
export class Markdown {
  /**
   * Constructor
   */
  constructor() {

  }

  makeTitle(title, url){
	return "["+ title +"]" + "(" + url + ")"
  }

  makeTable(objects) {
	let data = [{
	  type : "Product Backlog Item",
	  number : "1234",
	  title : "hogehoge",
	  url : "https://example.com",
	  platform : "Azure DevOps",
	  description : "hogehoge"	  
	},
	{
	  type : "Product Backlog Item",
	  number : "1235",
	  title : "hogehoge",
	  url : "https://example.com",
	  platform : "Azure DevOps",
	  description : "hogehoge"	  
	}]
	
	var text = "| PBI | 備考 |" + "\n" + "| --- | --- |"
	objects.forEach(element => {
	  var writer = new Markdown()
	  var title = writer.makeTitle(element.type + " " + element.number + " " + element.title, element.url)
	  var row = "| " + title + " | " + " |"
	  text += "\n" + row
	})
	
	return text
  }
}
