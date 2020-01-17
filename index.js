/**
 * Manysales editor
 * @author Manysales Team
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
    // console.log('this.targetElement', this.targetElement)
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

Mseditor.prototype.initBlockStyle = function (targetButton) {
    console.log(targetButton)
    var div = document.createElement('div')
    var divAlignLeft = document.createElement('div')
    var divAlignCenter = document.createElement('div')
    var divAlignRight = document.createElement('div')
}

Mseditor.prototype.eventListener = function() {
    const _this = this
    this.targetElement.addEventListener('onkeyup', function() {
        if (window.getSelection && window.getSelection().getRangeAt) {
            var range = window.getSelection().getRangeAt(0);
            var selectedObj = window.getSelection();
            var rangeCount = 0;
            var childNodes = selectedObj.anchorNode.parentNode.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
                if (childNodes[i] == selectedObj.anchorNode) {
                    break;
                }
                if (childNodes[i].outerHTML) {
                    rangeCount += childNodes[i].outerHTML.length;
                    console.log('rangeCount-2', rangeCount)
                }
                else if (childNodes[i].nodeType == 3) {
                    console.log('rangeCount-2',rangeCount)

                    rangeCount += childNodes[i].textContent.length;
                }
            }
            return range.startOffset + rangeCount;
        }
        return -1;
    })
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
    // console.log(childNodes)
    childNodes && childNodes.forEach(function(element) {
        // console.log(element.nodeName)
    })


    this.targetInsertButton.addEventListener('click', function() {
        var divButtonContent = document.createElement('div')
        divButtonContent.innerText = 'Button'
        divButtonContent.setAttribute('contenteditable', true)

        var divButton = document.createElement('div')
        divButton.setAttribute('class', 'mseditor-button')
        // divButton.setAttribute('contenteditable', false)
        var buttonStyle = JSON.stringify({
            'backgroud': '#F00',
            'color': '#FFF',
            'padding': '10px 20px',
            'margin-top': '10px',
            'margin-bottom': '20px'
        })
        divButton.setAttribute('data-style', buttonStyle)
        divButton.appendChild(divButtonContent)

        divButton.addEventListener('click', function() {
            _this.initBlockStyle(this)
        })

        var div = document.createElement('div')
        div.setAttribute('class', 'mseditor-button-wrap')
        // div.setAttribute('contenteditable', false)
        div.appendChild(divButton)

        _this.targetContent.focus()
        console.log(_this.targetContent)
        _this.insertHtmlAtCaret(div, false)
    })


}


Mseditor.prototype.insertHtmlAtCaret = function(html, selectPastedContent) {
    function createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }
    
        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                     range.setEnd(node, chars.count);
                     chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = createRange(node.childNodes[lp], chars, range);
    
                    if (chars.count === 0) {
                       break;
                    }
                }
            }
       } 
    
       return range;
    };
    
    function setCurrentCursorPosition(pos) {
        if (chars >= 0) {
            var selection = window.getSelection();
    
            range = createRange(document.getElementById("test").parentNode, { count: pos });
    
            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };
    







    var sel, range;
    console.log(window.getSelection())
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        console.log(sel)
        console.log(sel.getRangeAt)
        console.log(sel.rangeCount)
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


function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

Mseditor.prototype.getCaretPosition = function() {
    if (window.getSelection && window.getSelection().getRangeAt) {
        var range = window.getSelection().getRangeAt(0);
        var selectedObj = window.getSelection();
        var rangeCount = 0;
        var childNodes = selectedObj.anchorNode.parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i] == selectedObj.anchorNode) {
                break;
            }
            if (childNodes[i].outerHTML)
                rangeCount += childNodes[i].outerHTML.length;
            else if (childNodes[i].nodeType == 3) {
                rangeCount += childNodes[i].textContent.length;
            }
        }
        return range.startOffset + rangeCount;
    }
    return -1;
}