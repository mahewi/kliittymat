import io, json

def parseOpiskelijatToJson():

	f = open('opiskelijat.txt')
	line = f.readline()

	opiskelijalista = []

	while line:
		s = line
		aloitusvuosi, opiskelijanumero, nimi, kokonaisopintopistemaara, koulutusohjelma, paa_aine = s.split(";")
		opiskelija = {}
		opiskelija['id'] = opiskelijanumero.decode('utf-8').strip(' \t\n\r')
		opiskelija['started'] = aloitusvuosi.decode('utf-8').strip(' \t\n\r')
		opiskelija['name'] = nimi.decode('utf-8').strip(' \t\n\r')
		opiskelija['points'] = kokonaisopintopistemaara.decode('utf-8').strip(' \t\n\r')
		opiskelija['dprogram'] = koulutusohjelma.decode('utf-8').strip(' \t\n\r')
		opiskelija['major'] = paa_aine.decode('utf-8').strip(' \t\n\r')
		opiskelijalista.append(opiskelija)
		line = f.readline()

	with io.open('students.json', 'w', encoding="utf-8") as f:
			f.write(unicode(json.dumps(opiskelijalista, ensure_ascii=False)))

	f.close()

def parseKurssitToJson():
	f = open('suoritukset.txt')
	line = 	f.readline()

	kurssilista = []

	while line:
		s = line

		if line != '\n':
			opiskelijanumero, opjaksokoodi, kurssinNimi, suoritusPvm, opintopisteLaajuus = s.split(";")

			kurssi = {}
			kurssi['code'] = opjaksokoodi.decode('utf-8').strip(' \t\n\r')
			kurssi['name'] = kurssinNimi.decode('utf-8').strip(' \t\n\r')
			kurssi['points'] = opintopisteLaajuus.decode('utf-8').strip(' \t\n\r')
			kurssi['students'] = []

			loytyy = 0

			for i in kurssilista:
				if kurssi['code'] == i['code']:
					loytyy = 1
					break
			
			if (loytyy == 0):
				kurssilista.append(kurssi)

		line = f.readline()

	f.close()

	f = open('suoritukset.txt')
	line = 	f.readline()

	while line:
		s = line

		if line != '\n':

			opiskelijanumero, opjaksokoodi, kurssinNimi, suoritusPvm, opintopisteLaajuus = s.split(";")

			kurssi = {}
			kurssi['sid'] = opiskelijanumero.decode('utf-8').strip(' \t\n\r')
			kurssi['code'] = opjaksokoodi.decode('utf-8').strip(' \t\n\r')
			kurssi['date'] = suoritusPvm.strip(' \t\n\r')

			for i in kurssilista:
				if i['code'] == kurssi['code']:
					suorittaja = { 'sid': kurssi['sid'], 'date': kurssi['date']}
					i['students'].append(suorittaja)
		line = f.readline()

	f.close()

	with io.open('courses.json', 'w', encoding="utf-8") as f:
		f.write(unicode(json.dumps(kurssilista, ensure_ascii=False)))

def parseDegreesToJson():
	f = open('kandit.txt')
	lines = f.readlines()
	tutkintojenMaara = int(lines[0])
	degreeLista = []
	for i in range(1, tutkintojenMaara+1):
		degree = {}
		degree['id'] = i;
		degree['name'] = lines[i].strip(' \t\n\r');
		degree['courses'] = []
		degreeLista.append(degree)
	for i in range(tutkintojenMaara+1, len(lines)):
		s = lines[i]
		tutkintoNro, kurssiTunnus = s.split(" ")
		tutkintoNro = int(tutkintoNro)
		degreeLista[tutkintoNro-1]['courses'].append(kurssiTunnus.strip(' \t\n\r'))
	f.close()

	with io.open('degrees.json', 'w', encoding="utf-8") as f:
		f.write(unicode(json.dumps(degreeLista, ensure_ascii=False)))


parseOpiskelijatToJson()
parseKurssitToJson()
parseDegreesToJson()

