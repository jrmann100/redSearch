//https://www.tamdistrict.org/site/UserControls/Minibase/MinibaseListWrapper.aspx?ModuleInstanceID=8381

x = {}; for (let i=0;i<document.getElementsByClassName("sw-flex-item-list").length;i++){let theList = document.getElementsByClassName("sw-flex-item-list")[i].innerText.split("\n").slice(0, -1); let theParse = {}; for (let j=0;j<theList.length;j++){theParse[theList[j].split(/:(.+)/)[0]] = theList[j].split(/:(.+)/)[1]}; x[theList[0].split(":")[1].split(",")[0].toUpperCase().replace(" ", "-")] = theParse}; JSON.stringify(x)

//https://www.tamdistrict.org/site/UserControls/Minibase/MinibaseListWrapper.aspx?ModuleInstanceID=8381
//For grabbing just name and website.
//x = {}; for (let i=0;i<document.getElementsByClassName("sw-flex-item-list").length;i++){let theList = document.getElementsByClassName("sw-flex-item-list")[i].innerText.split("\n").slice(0, -1); let theParse = {}; for (let j=0;j<theList.length;j++){theParse[theList[j].split(/:(.+)/)[0]] = theList[j].split(/:(.+)/)[1]}; if (typeof theParse["Website"] != "undefined"){x[theList[0].split(":")[1]] = {"classCode": theList[0].split(":")[1].split(",")[0].toUpperCase().replace(" ", "-"), "specialUrl": theParse["Website"]}}}; JSON.stringify(x)
