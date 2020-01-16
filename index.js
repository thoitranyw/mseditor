/**
 * Manysales editor
 * @author FireApps
 * @version 1.0.0
 * @param {*} config 
 */

function Mseditor(config) {
    this.element = config.element || null
    this.targetElement = document.querySelector(config.element) ||  null
    this.targetContent = null
    this.currentCursorPosition = 0
    console.log('Mseditor')
    this.initContentEditTable()
    this.initBlockInsert()
    this.eventListener()
}

Mseditor.prototype.initContentEditTable = function(callback) {
    const _this = this
    console.log('this.targetElement', this.targetElement)
    if(! this.targetElement) return
    var childHtml = this.targetElement.innerHTML

    this.targetElement.innerHTML = ''

    var divContent = document.createElement('div')
    divContent.setAttribute('class', 'mseditor-content')
    divContent.setAttribute('contenteditable', true)
    divContent.insertAdjacentHTML('beforeend', childHtml)

    var divContainer = document.createElement('div')
    divContainer.setAttribute('class', 'mseditor-container')
    divContainer.insertAdjacentElement('beforeend', divContent)

    this.targetContainer = divContainer

    this.targetElement.insertAdjacentElement('beforeend', divContainer)
    this.targetContent = divContent

    callback && callback()
}   

Mseditor.prototype.initBlockInsert = function(target = null, callback) {
    
    var divIcon = document.createElement('div')
    divIcon.setAttribute('class', 'mseditor-insert-group')
    this.targetInsertGroup = divIcon

    var img = ''
    var div = document.createElement('div')
    div.setAttribute('class', 'mseditor-insert-wrap')

    var divImage = document.createElement('div')
    divImage.setAttribute('class', 'mseditor-insert-image')
    img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAAbklEQVR4AWOgKohn2MNwAAfcA5QFAm2G//ghUAWDA0FFDoNC0RaGJ7gVnQKRQAUCDKYMv7ErmsjAClT2G6gABAqwKTrMwAyUEgUGHgxsR1f0gyEIyEKFAQzfSfKdDkFFmiC7mxgO4IR7gW6kIgAAQnXErfH834oAAAAASUVORK5CYII=" />'
    divImage.innerHTML = img + 'Insert image'
    this.targetInsertImage = divImage
    
    var divButton = document.createElement('div')
    divButton.setAttribute('class', 'mseditor-insert-button')
    img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAASklEQVR4AWOgN2BmOMTwHw88DFTBYAFmPmBowAIfgOUsGRgcwIwDWG05AJazp5oiO6opsqWaIhsiFVkSDEwzULQcwRstR4Aq6AsAZtllIvPls/gAAAAASUVORK5CYII=" />'
    divButton.innerHTML = img + 'Insert button'
    this.targetInsertButton = divButton
    
    var divEmoji = document.createElement('div')
    divEmoji.setAttribute('class', 'mseditor-insert-emoji')
    img = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAQAAAD8x0bcAAAA2klEQVR4AZXSgUZDYRgG4AeI+dEuYAsGkGB31AQMaJiAwgwGoOoWZgNaBg1gwE7qPjKSM/bXwfmxcxR7Xvjwgff7HKtlYOWzyMpAS00wF+2s3RdZ24nmAiQNmWioIQluRJkTkidRT1VP9AjQsXeHult7HWAk18S7D0Cam3IjYGMB3ookaX6WAd8m/jLxBWz/XdoCGy+48FPJORYyYCzXxPJgZYlTuTFwVlYQTKWVqVBW0AZ4EF2Crr6+LriSygQNG9FQkATD6lkIZqL84MAzQU3bdfkqrwbajvMLhPdgsjqUL/wAAAAASUVORK5CYII=" />'
    divEmoji.innerHTML = img + 'Insert emoji'
    this.targetInsertEmoji = divEmoji

    div.appendChild(divImage)
    div.appendChild(divButton)
    div.appendChild(divEmoji)
    divIcon.appendChild(div)
    this.targetContainer.insertAdjacentElement('beforeend', divIcon)

    callback && callback()
}

Mseditor.prototype.initblockStyle = function () {

}

Mseditor.prototype.getCurrentCursorPosition = function(parentId) {
    var selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode) {
        if (isChildOf(selection.focusNode, parentId)) {
            node = selection.focusNode; 
            charCount = selection.focusOffset;

            while (node) {
                if (node.id === parentId) {
                    break;
                }

                if (node.previousSibling) {
                    node = node.previousSibling;
                    charCount += node.textContent.length;
                } else {
                     node = node.parentNode;
                     if (node === null) {
                         break
                     }
                }
           }
        }
   }

    return charCount;
};

Mseditor.prototype.eventListener = function() {
    const _this = this
    this.targetContainer.addEventListener('mouseover', function() {
        _this.targetContainer.classList.add('mseditor-focus')
        const offsetTop = _this.targetContent.offsetTop + 40
        _this.targetInsertGroup.style.top = offsetTop + 'px'

    })

    this.targetContainer.addEventListener('mouseout', function() {
        _this.targetContainer.classList.remove('mseditor-focus')
    })

    this.targetContent.addEventListener('input', function() {
        
    })

    this.targetInsertGroup.addEventListener('mouseover', function() {
        this.classList.add('open-insert')
    })
    this.targetInsertGroup.addEventListener('mouseout', function() {
        this.classList.remove('open-insert')
    })

    const childNodes = this.targetContent.childNodes
    console.log(childNodes)
    childNodes && childNodes.forEach(function(element) {
        console.log(element.nodeName)
    })


    this.targetInsertButton.addEventListener('click', function() {
        var divButtonContent = document.createElement('div')
        divButtonContent.innerText = 'Button'
        divButtonContent.setAttribute('contenteditable', true)

        var divButton = document.createElement('div')
        divButton.setAttribute('class', 'mseditor-button')
        divButton.setAttribute('contenteditable', false)

        // divButton.appendChild(divButtonContent)

        _this.targetContent.focus()
        console.log(divButton)
        _this.insertHtmlAtCaret(divButton, false)
    })
}


Mseditor.prototype.insertHtmlAtCaret = function(html, selectPastedContent) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // only relatively recently standardized and is not supported in
            // some browsers (IE9, for one)
            var el = document.createElement("div");
            el.appendChild(html);
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
            var firstNode = frag.firstChild;
            range.insertNode(frag);
            
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                if (selectPastedContent) {
                    range.setStartBefore(firstNode);
                } else {
                    range.collapse(true);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
            range = sel.createRange();
            range.setEndPoint("StartToStart", originalRange);
            range.select();
        }
    }
}
