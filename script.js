/**@type {HTMLElement} */
let receptHtml = null
let receptHtmlString = ""
let showOnScreen = 4
let slide = 0

const vlockyTypes = {
    "overnight/cold": "přes noc / studené",
    "overnight/hot": "přes noc + ohřáté",
    "pan/hot": "na pánvičce",
    "now/hot": "ohřáté",
    "bake/any": "upečené"
}


window.onload = async () => {
    receptHtmlString = await (await fetch("./recept.html")).text()
    receptHtml = new DOMParser().parseFromString(receptHtmlString, 'text/html')
    swtch(0)
    reloadRecepty()
}
function swtch(bool = 0) {
    document.getElementById("topTier").style.display = ["unset", "none"][bool]
    document.getElementById("receptTier").style.display = ["none", "unset"][bool]
}
function reloadRecepty() {
    document.getElementById("containerList").innerHTML = ""
    for (let i = 0; i < (slide + 1) * (showOnScreen); i++) {
        let add = ""
        if (!recepty[i]) {
            add = `<span class="matText">
                <span class="material-symbols-outlined">done</span>
                <span class="span2">to je vše</span>
            </span>`
            document.getElementById("toJeVse").innerHTML = add
        }
        document.getElementById("containerList").innerHTML += `

        <div class="containerJeden">
        <span class="title3 tt">${recepty[i].title || "<span class='barva2'>bez názvu</span>"}</span>
        <span class="title4 tt">${recepty[i].description || "<span class='barva2'>bez popisku</span>"}</span>
        <div class="titles">
            <div class="titles1 titlesn">
                <span class="title5 tt">
                    <span class="material-symbols-outlined">alarm</span>
                    <span class="span2">${recepty[i].time || "?"}</span>
                </span>
            </div>
            
            <div class="titles2 titlesn">
                <button class="receptBtn" onclick="openRecept('${encodeURI(JSON.stringify(recepty[i]))}')">
                    <span class="span2">recept</span>
                    <span class="material-symbols-outlined">menu_book</span>
                </button>
            </div>
        </div>
    </div><br>
    ${add}
        
        `
    }

}

function loadNext() {
    slide += 1
    reloadRecepty()
}

function openRecept(receptik = null) {
    receptik = JSON.parse(decodeURI(receptik) || "{}")
    let recept = receptik?.recept.map(e => "<span class='radek'><span class='tecka'>-</span> "+e+"</span>").join("") || "?"
    let title = receptik?.title
    let typ = vlockyTypes[receptik?.type] || receptik.type
    let description = receptik?.description
    let cas = receptik?.time



    let el = receptHtml
    // INP - postup, reference, popis, cas
    el.getElementById("INP-postup").innerHTML=recept || "bez postupu..."
    el.getElementById("INP-type").innerHTML=typ || "?"
    el.getElementById("INP-title").innerText=title || "bez názvu..."
    el.getElementById("INP-popis").innerText=description || "bez popisku..."
    el.getElementById("INP-cas").innerText=cas || "?"


    document.getElementById("receptTier").innerHTML = ""
    document.getElementById("receptTier").insertAdjacentHTML("beforeend",el.firstChild.innerHTML)
    // document.getElementById("receptTier").appendChild(el.firstChild)

    swtch(1)
}