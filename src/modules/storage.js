/**
 * Storage
 */
export class Storage {
  /**
   * Constructor
   */
  constructor() {
  }

  static loadConfig() {
	return new Promise(function(resolve, reject) {
	  chrome.storage.local.get("format", function(items) {
		resolve(items);
	  })
    });	
  }
  
  static save(value) {
	chrome.storage.local.set({format:value});
  }  
}
