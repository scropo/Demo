/**
 * Construcs a new treeview for the given editor.
 */
function TreeList(editorUi, container){
    this.editorUi = editorUi;
	this.container = container;
    this.init();
}

TreeList.prototype.init = function(){
    var elt = document.createElement('div');
	elt.className = 'geSidebar';
	elt.style.boxSizing = 'border-box';
	elt.style.overflow = 'hidden';
	elt.style.width = '100%';
	elt.style.padding = '8px';
	elt.style.paddingTop = '14px';
	elt.style.paddingBottom = '0px';
	this.container.appendChild(elt);
	this.addSearch(elt);
	this.addTree(elt);
}

TreeList.prototype.addSearch = function(container) {
	var div = document.createElement('div');
	div.style.width = '100%';
	div.style.paddingBottom = '15px';
	div.style.whiteSpace = 'nowrap';
	div.style.textOverflow = 'clip';
	div.style.cursor = 'default';


	var input = document.createElement('input');
	input.setAttribute('placeholder', mxResources.get('searchShapes'));
	input.setAttribute('type', 'text');
	input.style.fontSize = '12px';
	input.style.overflow = 'hidden';
	input.style.boxSizing = 'border-box';
	input.style.border = 'solid 1px #d5d5d5';
	input.style.borderRadius = '4px';
	input.style.width = '100%';
	input.style.outline = 'none';
	input.style.padding = '6px';
	div.appendChild(input);

	var cross = document.createElement('img');
	cross.setAttribute('src', Sidebar.prototype.searchImage);
	cross.setAttribute('title', mxResources.get('search'));
	cross.style.position = 'relative';
	cross.style.left = '-18px';
	
	if (mxClient.IS_QUIRKS)
	{
		input.style.height = '28px';
		cross.style.top = '-4px';
	}
	else
	{
		cross.style.top = '0';
	}

	// Needed to block event transparency in IE
	cross.style.background = 'url(\'' + this.editorUi.editor.transparentImage + '\')';

	div.appendChild(cross);

	container.appendChild(div);

	// Workaround for blocked text selection in Editor
    mxEvent.addListener(input, 'mousedown', function(evt)
    {
    	if (evt.stopPropagation)
    	{
    		evt.stopPropagation();
    	}
    	
    	evt.cancelBubble = true;
    });
	// Workaround for blocked text selection in Editor
    mxEvent.addListener(input, 'selectstart', function(evt)
    {
    	if (evt.stopPropagation)
    	{
    		evt.stopPropagation();
    	}
    	
    	evt.cancelBubble = true;
    });
}

TreeList.prototype.addTree = function (container) {
	var defaultData = [
		{
			text: '机房 1',
			href: '#parent1',
			nodes: [
				{
					text: '机柜 1',
					href: '#child1',
					nodes: [
						{
							text: '元件 1',
							href: '#grandchild1'
						},
						{
							text: '元件 2',
							href: '#grandchild2'
						}
					]
				},
				{
					text: '机柜 2',
					href: '#child2'
				}
			]
		},
		{
			text: '机房 2',
			href: '#parent2',
			nodes: [
				{
					text: '元件 1',
					href: '#grandchild1'
				}
			]
		},
		{
			text: '机房 3',
			href: '#parent3'
		},
		{
			text: '机房 4',
			href: '#parent4'
		},
		{
			text: '机房 5',
			href: '#parent5'
		}
	];
	var div = document.createElement('div');
	div.style.width = '100%';
	container.appendChild(div);
	$(div).treeview({
		levels: 1,
		data: defaultData,
		showTags: true,
		showBorder: false
	});
}