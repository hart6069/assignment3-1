/* ---------- Create Navigation ----------*/
var tabGroup = Titanium.UI.createTabGroup();
	
var win1 = Titanium.UI.createWindow({  
	    title:'Select The Color Of Your Tea!',
	    backgroundColor:'#fff'
	 });
var tab1 = Titanium.UI.createTab({  
    	icon:'KS_nav_views.png',
	    title:'Tea Colours',
    	window:win1
	});
	
var win2 = Ti.UI.createWindow({
		backgroundColor:'#fff',
		title:'Camera'
	});
var tab2 = Titanium.UI.createTab({  
    	icon:'KS_nav_ui.png',
    	title:'Camera App',
    	window:win2
	});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

tabGroup.open();
	 

/* ---------- Tea Colour Function Starts ----------  */
/* In the book, they make the function a self-executing function. 
   I changed it so it's not a self-executing function anymore. */ 
var TeaColour = function() {	
	//Colours of tea
	var Teas = ['#F5F5DC', '#FFE4B5', '#FFE4C4', '#D2B48C', '#C3B091', 
				'#C3B091', '#926F5B', '#804000', '#654321', '#3D2B1F'];

	allRows = [];
	var theColours = Ti.UI.createTableView({});
	
	for (var i=0; i<Teas.length; i++) {
		theRow = Ti.UI.createTableViewRow({
			backgroundColor: Teas[i], 
			height:'10%', 
			TeaColour:Teas[i]});
		allRows.push(theRow);
	}
	
	theColours.setData(allRows);
	
	function getVerdict(colour) {
		var indicator = colour.charAt(1);
		var msg;
		switch(indicator) {
			case 'F': msg = 'Ooh, Silky smooth milky.'; break;
			case 'D': msg = 'Niceeee.'; break;
			case 'C': msg = 'Perfection to the t.'; break;
			case '9': msg = 'A tad bit strong, no?'; break;
			case '8': msg = 'Good old builders tea.'; break;
			case '6': msg = 'Wow, wow. Just, send it back.'; break;
			case '3': msg = 'No milk here, nope.'; break;
		}
		return msg;
	};
	
	function showTeaVerdict(_args) {
		var teaVerdict = Ti.UI.createWindow({layout:'vertical'});
		
		teaVerdict.backgroundColor = _args;
		teaVerdict.msg = getVerdict(_args);
		
		var judgement = Ti.UI.createLabel({
			text:teaVerdict.msg, 
			top:'50%'
			});
		var close = Ti.UI.createButton({
			title:'Choose again', 
			top:'20%'
			});
		close.addEventListener('click', function(e) 
			{teaVerdict.close(); 
			//release the resource
			teaVerdict = null;
			});
		
		teaVerdict.add(judgement);
		teaVerdict.add(close);
		teaVerdict.open();
	}	
	
	theColours.addEventListener('click', function(e) {
		showTeaVerdict(e.source.TeaColour)});
		
	win1.add(theColours);
	};

//Call Tea Colour
TeaColour();


/* ---------- Tea Colour Function Ends ---------- */


/* ---------- Camera App Starts ---------- */

var options = Ti.UI.createView({layout: 'vertical'});

var showCamera = Ti.UI.createButton({
	title: 'Show Camera',
	height: '50%',
	font: { fontSize: 20 }
	});
var emailFromLibrary = Ti.UI.createButton({
	title: 'Email from photo library',
	height: '10%',
	font: { fontSize: 20 }
	});

function showPhoto(_args) {
	thePhoto.setImage(_args.media);
}

function emailPiccy(_args) {
	
	var toSend = Ti.UI.createEmailDialog({});
	
	toSend.subject = 'Insert Your Subject Here';
	toSend.messageBody = 'Insert Message Here';
    toSend.addAttachment(_args.media);
    toSend.open();
    
}
var thePhoto = Ti.UI.createImageView({height: '30%', width: '30%'});

showCamera.addEventListener('click', function (e) {
Ti.Media.showCamera({animated: true,
	                 autoHide: true,
	                 saveToPhotoGallery: true,
	                 showControls: true,
	                 mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
	                 success:    function(e) {showPhoto(e)}
	                 })
});

emailFromLibrary.addEventListener('click', function(e) {
	Ti.Media.openPhotoGallery({
		autoHide:   true,
		mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO],
		success:    function(e) {emailPiccy(e)}
		});
});

options.add(showCamera);
options.add(emailFromLibrary);
options.add(thePhoto);
win2.add(options);
/* ---------- Camera Ends ---------- */

win1.open();
win2.open();
