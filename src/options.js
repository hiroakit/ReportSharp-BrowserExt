window.addEventListener('load', function(){
  let form = document.getElementById('form')
  form.onsubmit = function(){
	let format = this.format.value;
	chrome.storage.local.set({format:format});
	return false;
  }
})
