var getStyle = function(className,pseudoClassName) {
    let classNameWithPseudo = '.' + className + ':' + pseudoClassName;
    var x, sheets, classes;
    var style = [];
    for (sheets = document.styleSheets.length - 1; sheets >= 0; sheets--) {
        classes = document.styleSheets[sheets].rules || document.styleSheets[sheets].cssRules;
        for (x = 0; x < classes.length; x++) {
            let selectorClass;
            if(classes[x].media !== undefined)
                selectorClass = classes[x].cssText;
            else
                selectorClass = classes[x].selectorText;
            if (selectorClass !== undefined)
                if (selectorClass.includes(classNameWithPseudo) || (selectorClass.includes('.'+className+' ')&&selectorClass.includes(pseudoClassName))) {
                    style.push(classes[x].cssText ? classes[x].cssText : classes[x].style.cssText);
                }
        }
    }

    return style.length>0 ? style : false; 
};

var forcePseudo = function(className, pseudoClassName) {
    
    let style = getStyle(className,pseudoClassName);
    if (style !== false) {

      style.forEach(rule => {
        rule = rule.toString().replaceAll(':' + pseudoClassName, '');
        rule = rule.toString().replaceAll(';', ' !important;');
        rule = rule.toString().replaceAll('!important ', ' ');
        rule = rule.toString().replaceAll(/(?<!\)) {/gm,'.forced {');
        document.styleSheets[0].insertRule(rule, 0);
      })

    }
};


function handleElem(elem) {
    while (elem.classList.length == 0) {
        elem = elem.parentElement;
    }

    elem.classList.forEach(className=>forcePseudo(className, 'hover'));
}

//to remove changes
// document.styleSheets[0].deleteRule(0);

//Menu selector - div:nth-child(1) controls which menu item
var selectors =  [
//all
//"#app > main > div > div.detail-view--detail-view--moQqS.t3sel-detail-view > section > div > div.loading-indicator--loading-indicator--1USc6.t3sel-loading-indicator > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div.card-opti-drive--card-right--3f1pS *"  

// single
"#app > main > div > div.detail-view--detail-view--moQqS.t3sel-detail-view > section > div > div.loading-indicator--loading-indicator--1USc6.t3sel-loading-indicator > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div.card-opti-drive--card-right--3f1pS > svg:nth-child(4)",  
"#app > main > div > div.detail-view--detail-view--moQqS.t3sel-detail-view > section > div > div.loading-indicator--loading-indicator--1USc6.t3sel-loading-indicator > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div.card-opti-drive--card-right--3f1pS > svg:nth-child(4) *"

];

let elems = document.querySelectorAll(selectors.join());

elems.forEach(elem=>handleElem(elem));
elems.forEach(elem=>elem.classList.add('forced'));
