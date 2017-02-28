/**
 * Construcs a new attribute panel for the given editor.
 */
AttriPanel = function(editorUi, container){
    this.editorUi = editorUi;
    this.container = container;
}

/**
 * Returns information about the current selection.
 */
AttriPanel.prototype.labelIndex = 0;

AttriPanel.prototype.currentIndex = 0;

AttriPanel.prototype.init = function(){
    var ui = this.editorUi;
	var editor = ui.editor;
	var graph = editor.graph;

    this.update = mxUtils.bind(this, function(sender, evt)
	{
		this.clearSelectionState();
		this.refresh();
	});

    graph.getSelectionModel().addListener(mxEvent.CHANGE, this.update);
	graph.addListener(mxEvent.EDITING_STARTED, this.update);
	graph.addListener(mxEvent.EDITING_STOPPED, this.update);
	graph.getModel().addListener(mxEvent.CHANGE, mxUtils.bind(this, function()
	{
		this.clearSelectionState();
	}));
	graph.addListener(mxEvent.ROOT, mxUtils.bind(this, function()
	{
		this.refresh();
	}));

    this.refresh();
}

AttriPanel.prototype.clearSelectionState = function()
{
	this.selectionState = null;
};

AttriPanel.prototype.clear = function()
{
	this.container.innerHTML = '';
	
	// Destroy existing panels
	if (this.panels != null)
	{
		for (var i = 0; i < this.panels.length; i++)
		{
			this.panels[i].destroy();
		}
	}
	
	this.panels = [];
};

AttriPanel.prototype.refresh = function(){
    // Performance tweak: No refresh needed if not visible
	if (this.container.style.width == '0px')
	{
		return;
	}
    this.clear();
    var ui = this.editorUi;
    var graph = ui.editor.graph;

    var div = document.createElement("div");
    div.style.backgroundColor = 'rgb(255,255,255)';
    div.style.margin = '10px';
    div.style.border = '1px solid #ddd';
    div.style.borderRadius = '5px';
    this.container.appendChild(div);

    var headerDiv = this.createHeader();
    div.appendChild(headerDiv);

    var defaultDiv = this.createPanel();
    var defaultTitle = this.createTitle('默认属性');
    var defaultTable = this.addDefault();
    defaultDiv.appendChild(defaultTitle);
    defaultDiv.appendChild(defaultTable);
    div.appendChild(defaultDiv);
    this.hidePanel(defaultTitle, defaultTable);

    var specialDiv = this.createPanel();
    var specialTitle = this.createTitle('特有属性');
    var specialTable = this.addSpecial();
    specialTable.style.display = 'none';
    specialDiv.appendChild(specialTitle);
    specialDiv.appendChild(specialTable);
    div.appendChild(specialDiv);
    this.hidePanel(specialTitle, specialTable);

    var customDiv = this.createPanel();
    var customTitle = this.createTitle('自定义属性');
    var customTable = this.addCustom();
    customTable.style.display = 'none';
    customDiv.appendChild(customTitle);
    customDiv.appendChild(customTable);
    div.appendChild(customDiv);
    this.hidePanel(customTitle, customTable);

    if(graph.isSelectionEmpty()){
        
    }
    else{
        
    }
}

AttriPanel.prototype.createHeader = function(){
    var ui = this.editorUi;

    var div = document.createElement('div');
	div.style.whiteSpace = 'nowrap';
	div.style.color = 'rgb(112, 112, 112)';
	div.style.textAlign = 'left';
	div.style.cursor = 'default';
    div.style.borderTopLeftRadius = '5px';
    div.style.borderTopRightRadius = '5px';
    div.style.padding = '8px';

    var label = document.createElement('div');
	label.style.textAlign = 'center';
	label.style.fontWeight = 'bold';
	label.style.overflow = 'hidden';
	label.style.display = 'inline-block';
	label.style.width = '100%';
    label.style.position = 'relative';
    mxUtils.write(label, mxResources.get('attribute'));
    // Adds button to hide the format panel since
    // people don't seem to find the toolbar button
    // and the menu item in the format menu
    var img = document.createElement('img');
    img.setAttribute('src', Dialog.prototype.arrowImage);
    img.setAttribute('title', mxResources.get('hide'));
    img.style.float = 'right';
    img.style.marginTop = '4px';
    img.style.cursor = 'pointer';
    img.style.opacity = 0.8;
    img.style.position = 'absolute';
    img.style.top = '1px';
    img.style.right = '0';
    label.appendChild(img);

    mxEvent.addListener(img, 'click', function () {
        ui.actions.get('formatPanel').funct();
    });
    div.appendChild(label);

    return div;
}

/**
 * Create one panel
 */
AttriPanel.prototype.createPanel = function()
{
	var div = document.createElement('div');
	div.style.borderTop = '1px solid #ddd';
	
	return div;
};

/**
 * Create title for one panel
 */
AttriPanel.prototype.createTitle = function(title){
    var div = document.createElement('div');
	div.style.padding = '8px 20px';
	div.style.whiteSpace = 'nowrap';
	div.style.overflow = 'hidden';
	div.style.fontWeight = 'bold';
    div.style.backgroundColor = 'rgba(216,233,242,.5)';
    div.style.borderBottom = '1px solid rgb(221, 221, 221)';
    div.style.cursor = 'pointer';
    div.style.position = 'relative';
	mxUtils.write(div, title);

    var img = document.createElement('img');
    img.setAttribute('border', '0');
    img.setAttribute('src', Dialog.prototype.downImage);
    img.style.float = 'right';
    img.style.marginTop = '5px';
    img.style.position = 'absolute';
    img.style.top = '10px';
    img.style.right = '20px';
    div.appendChild(img);
	
	return div;
}

/**
 * Create default attribute panel
 */
AttriPanel.prototype.addDefault = function(){
    var div = document.createElement('div');
    this.addOneAttribute(div, "设备ID", "7382291");
    this.addOneAttribute(div, "类别", "机箱");
    this.addOneAttribute(div, "温度", "45℃");
    this.addOneAttribute(div, "体积", "10m³");

    return div;
}

/**
 * Create special attribute panel
 */
AttriPanel.prototype.addSpecial = function(div){
    var div = document.createElement('div');
    this.addOneAttribute(div, "长度", "100cm");
    this.addOneAttribute(div, "高度", "300cm");
    this.addOneAttribute(div, "宽度", "80cm");

    return div;
}

/**
 * Create custom attribute panel
 */
AttriPanel.prototype.addCustom = function(div){
    var div = document.createElement('div');
    this.addOneAttribute(div, "所属部门", "Lab 2012");
    this.addOneAttribute(div, "操作系统", "Linux OS");
    this.addOneAttribute(div, "维护时间", "2017年2月10日");
    this.addOneAttribute(div, "购入时间", "2016年10月21日");

    return div;
}

/**
 * Add one attribute to panel
 */
AttriPanel.prototype.addOneAttribute = function(div, name, value){
    var row = document.createElement('div');
    row.style.width = '100%';
    row.style.height = '25px';
    row.style.lineHeight = '25px';
    row.style.margin = '8px 0';

    var labelName = document.createElement('label');
    labelName.style.float = 'left';
    labelName.style.textAlign = 'right';
    labelName.style.minWidth = '90px';
    labelName.style.fontWeight = "normal";
    mxUtils.write(labelName, name + "：");
    row.appendChild(labelName);

    var labelValue = document.createElement('label');
    labelValue.style.float = 'left';
    labelValue.style.marginLeft = '5px';
    labelValue.style.fontWeight = "normal";
    mxUtils.write(labelValue, value);
    row.appendChild(labelValue);

    div.appendChild(row)
}

AttriPanel.prototype.hidePanel = function (title, table) {
    mxEvent.addListener(title, 'click', mxUtils.bind(this, function (evt) {
        if (table.style.display != 'none') {
            table.style.display = 'none';
        }
        else {
            table.style.display = '';
        }
    }));
}