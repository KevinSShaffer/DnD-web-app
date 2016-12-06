
var Participant = function(name, maxHp, init, atk, ac) {
	this.name = name;
	this.maxHp = maxHp;
	this.hp = maxHp;
	this.init = roll(20) + Number(init);
	this.atk = atk;
	this.ac = ac;
}

function roll(max) {
    return Math.floor(Math.random() * max) + 1;
}

function addEnemies() {
	var name = document.getElementById('enemyType').value;
	var count = document.getElementById('enemyAmount').value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			addEnemiesToTable(this, name, count);
		};
	};
	xhttp.open('GET', 'objects.xml', true);
	xhttp.send();
}

function addEnemiesToTable(xml, name, count) {
	var xmlDoc = xml.responseXML;
	var table = document.getElementById('battleTable');
	var txt = table.innerHTML.trim() == '' ?
		'<tr><th>Name</th><th>HP</th><th>Initiative</th><th>Attack</th><th>Armor</th></tr>' :
		table.innerHTML;
	var units = xmlDoc.getElementsByTagName('UNIT');
	for (var i = 0; i < units.length; i++) {
		if (units[i].getElementsByTagName('NAME')[0].childNodes[0].nodeValue == name) {
			for (var j = 0; j < count; j++) {
				var p = new Participant(
					units[i].getElementsByTagName('NAME')[0].childNodes[0].nodeValue,
					units[i].getElementsByTagName('MAXHP')[0].childNodes[0].nodeValue,
					units[i].getElementsByTagName('INIT')[0].childNodes[0].nodeValue,
					units[i].getElementsByTagName('ATK')[0].childNodes[0].nodeValue,
					units[i].getElementsByTagName('AC')[0].childNodes[0].nodeValue
				);
				txt += '<tr><td>' + p.name + (j + 1) + '</td><td>' + p.maxHp + '</td><td>'+
					p.init + '</td><td>' + p.atk + '</td><td>' + p.ac + '</td></tr>';
			}
		}
	}
	
	table.innerHTML = txt;
}
	