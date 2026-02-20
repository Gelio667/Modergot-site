(function(){
	function q(sel){return document.querySelector(sel)}
	function qa(sel){return Array.from(document.querySelectorAll(sel))}
	function norm(s){return (s||"").toLowerCase().trim()}
	function escapeHtml(s){
		return (s||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
	}

	async function loadIndex(){
		try{
			const r = await fetch("../assets/search_index.json", {cache:"no-store"})
			if(!r.ok) return []
			return await r.json()
		}catch{
			return []
		}
	}

	function renderResults(items, query){
		const box = q("#searchResults")
		if(!box) return
		const qq = norm(query)
		if(!qq){
			box.innerHTML = ""
			return
		}
		const out = items
			.filter(x => norm(x.title).includes(qq) || norm(x.body).includes(qq))
			.slice(0, 12)
			.map(x => {
				const title = escapeHtml(x.title)
				const url = escapeHtml(x.url)
				const snippet = escapeHtml((x.body||"").slice(0, 180))
				return `<div class="card"><div><a href="${url}"><strong>${title}</strong></a></div><div class="small">${snippet}</div></div>`
			})
			.join("")
		box.innerHTML = out || `<div class="card"><div class="small">Ничего не найдено.</div></div>`
	}

	async function initSearch(){
		const inp = q("#searchInput")
		if(!inp) return
		const items = await loadIndex()
		inp.addEventListener("input", () => renderResults(items, inp.value))
	}

	function setActiveNav(){
		const links = qa(".sidebar a")
		const p = location.pathname.split("/").pop()
		links.forEach(a=>{
			const href = (a.getAttribute("href")||"").split("/").pop()
			if(href && href === p) a.classList.add("active")
		})
	}

	document.addEventListener("DOMContentLoaded", ()=>{
		setActiveNav()
		initSearch()
	})
})();