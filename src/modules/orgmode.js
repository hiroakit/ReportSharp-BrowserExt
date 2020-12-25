/**
 * OrgMode
 */
export class OrgMode {
  /**
   * Constructor
   */
  constructor() {

  }

  makeTitle(title, url){
	return "[[" + url + "][" + title + "]]"
  }
}
