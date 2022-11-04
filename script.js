let recepty = [

]
/**@type {HTMLElement} */
let receptHtml = null
let receptHtmlString = ""
let showOnScreen = 4
let slide = 0


window.onload = async () => {
    recepty = await (await fetch("./recepty.json")).json()
    receptHtmlString = await (await fetch("./recept.html")).text()
    receptHtml = new DOMParser().parseFromString(receptHtmlString, 'text/html')
    console.log(receptHtml)
    openRecept(recepty[0])
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
            add = `
            <span class="matText">
                    <span class="material-symbols-outlined">done</span>
                    <span class="span2">to je vše</span>
            </span>

            `
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
                <button class="receptBtn" onclick="openRecept(['${recepty[i].recept || "nic"}','${recepty[i].title || "nic"}','${recepty[i].description || "nic"}','${recepty[i].time || "nic"}'])">
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

function openRecept(receptik = ["?","?","?","?"]) {
    
    let recept = receptik[0] || "?"
    let mrcpt = ""
    recept.split(";").forEach(e => {

        mrcpt+="<span class='radek'><tecka>-</tecka> "+e+"</span>"
    })
    for(let e in recept.split(";")) {
    }
    let title = receptik[1]
    let description = receptik[2]
    let cas = receptik[3] 



    let el = receptHtml
    // INP - postup, reference, popis, cas
    el.getElementById("INP-postup").innerHTML=mrcpt || "bez postupu..."
    el.getElementById("INP-title").innerText=title || "bez názvu..."
    el.getElementById("INP-popis").innerText=description || "bez popisku..."
    el.getElementById("INP-cas").innerText=cas || "?"


    document.getElementById("receptTier").innerHTML = ""
    document.getElementById("receptTier").insertAdjacentHTML("beforeend",el.firstChild.innerHTML)
    

    swtch(1)
}