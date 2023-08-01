/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('advancedWalkBtn');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('advancedModifyBtn');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        addType();
    });

}

function addType(){

    let typeSelect = document.getElementById('elementType');
    // Get the selected value (textNode, comment, or element)
    let selectedType = typeSelect.value;

    let userInput = document.getElementById('elementContent')

    const elementContent = userInput.value();

    let newElement;

    if(selectedType.equals('textNode')){
        newElement = document.createTextNode('New Text Node: ${new Date().toLocaleString()}');
    }
    else if (selectedType.equals('comment')){
        newElement = document.createComment('New Comment: ${new Date().toLocaleString()}');
    }
    else if (selectedType.equals('element') ){
        newElement = document.createElement(elementContent || 'div');

        newElement.textContent = `New Element - ${new Date().toLocaleString()}`;
    }
    else{
        return;
    }

    let outputDisplay = document.getElementById('outputDisplay');

    outputDisplay.appendChild(newElement);


    //initialize newElement
    newElement.value = '';
    

}

function advancedWalk() {

    let rootElement = document.documentElement;

    let textArea = document.getElementById('textArea');

    //initialize textArea
    textArea.value = '';

    //make a recursive function to loop through whole tree
    recursiveWalk(rootElement, 0);

}

function recursiveWalk(node, level) {
    //
    const indentation = '--'.repeat(level); // indent --
    // prefix setup
    const prefix = `${indentation}${node.nodeName} [${node.nodeType}]`;

    // If has childnode
    if (node.hasChildNodes()) {

        const nodeInfo = `${prefix}\n`;
        textArea.value += nodeInfo;
        
       
        const children = node.childNodes;
        for (let i = 0; i < children.length; i++) {
            recursiveWalk(children[i], level + 1);
        }
    } else {
      
        const nodeInfo = `${prefix}\n`;
        textArea.value += nodeInfo;
    }

}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    let textArea = document.getElementById('textArea');

    textArea.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;


    //alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModify(){
    let h1Element = document.getElementById('p2');
    
    h1Element.textContent = 'DOM Manipulation is Fun!';

    let allDark = [
        '--darkcolor1',
        '--darkcolor2',
        '--darkcolor3',
        '--darkcolor4',
        '--darkcolor5',
        '--darkcolor6',
    ];

    let randomColor = allDark[Math.floor(Math.random() * allDark.length)];

    h1Element.style.color = `var(${randomColor})`;

    let el = document.getElementById('p1');

    el.classList.toggle('shmancy'); //what is this?




}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);