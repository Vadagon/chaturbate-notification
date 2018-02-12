document.getElementById('tho').addEventListener("click", ()=>{
	chrome.runtime.sendMessage({path: document.getElementById('the').value}, function(response) {
	  console.log(12);
	});
});