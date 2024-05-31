drop database  pref_utenti;
CREATE DATABASE IF NOT EXISTS pref_utenti;
USE pref_utenti;
CREATE TABLE domande_esistenziali (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domanda TEXT NOT NULL
);

CREATE TABLE utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);


INSERT INTO utenti (username, password, email) VALUES ('admin', 'admin', 'admin@example.com');


CREATE TABLE cibi_preferiti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cibo VARCHAR(50) NOT NULL UNIQUE
);


INSERT INTO cibi_preferiti (nome_cibo) VALUES ('pizza'), ('sushi'), ('torta');

CREATE TABLE utente_cibi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utente INT NOT NULL,
    id_cibo INT NOT NULL,
    preferito TINYINT(1) DEFAULT 0,
    FOREIGN KEY (id_utente) REFERENCES utenti(id),
    FOREIGN KEY (id_cibo) REFERENCES cibi_preferiti(id),
    UNIQUE (id_utente, id_cibo)
);
CREATE TABLE oggetti_vinti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_oggetto VARCHAR(255) NOT NULL,
    utente_vincitore VARCHAR(255) NOT NULL
);
-- Popolazione della tabella utente_cibi per l'utente admin con valori di default (tutti a 0)
INSERT INTO utente_cibi (id_utente, id_cibo, preferito)
SELECT u.id, c.id, 0
FROM utenti u, cibi_preferiti c
WHERE u.username = 'admin';


-- Creazione del trigger per l'inserimento automatico dei valori di default
DELIMITER //

CREATE TRIGGER after_user_insert
AFTER INSERT ON utenti
FOR EACH ROW
BEGIN
    INSERT INTO utente_cibi (id_utente, id_cibo, preferito)
    SELECT NEW.id, c.id, 0
    FROM cibi_preferiti c;
END//

DELIMITER ;

CREATE TABLE domande_esistenziali (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domanda TEXT NOT NULL
);
INSERT INTO domande_esistenziali (domanda) VALUES ('che la mia vita sia un grande errore 404?');
INSERT INTO domande_esistenziali (domanda) VALUES ('"amare il prossimo come te stesso", ma è comune amarsi?');
INSERT INTO domande_esistenziali (domanda) VALUES ('che sia vero che è possibile vivere soltanto quando si muore?');
INSERT INTO domande_esistenziali (domanda) VALUES ('e se la rovina venisse prima della creazione?');
INSERT INTO domande_esistenziali (domanda) VALUES ('mettere l"ananas sulla pizza dovrebbe essere un crimine punibile con la pena di morte?');
INSERT INTO domande_esistenziali (domanda) VALUES ('i mezzi giustificano il fine?');
INSERT INTO domande_esistenziali (domanda) VALUES ('trentatré trentini andavano a Trento tutti e trentatré per fare cosa?');
INSERT INTO domande_esistenziali (domanda) VALUES ('avresti il coraggio di accettare di conoscere l"ora e il giorno della tua morte?');
INSERT INTO domande_esistenziali (domanda) VALUES ('che l"altruismo sia una diversa forma di egoismo?');
INSERT INTO domande_esistenziali (domanda) VALUES ('il mondo esiste fino a che vivo?');
INSERT INTO domande_esistenziali (domanda) VALUES ('le parole hanno significato? Spesso le persone non si intendono quando parlano anche se usano le parole corrette, quindi siamo noi che intrappoliamo il significato in contenitori insignificanti?');
INSERT INTO domande_esistenziali (domanda) VALUES ('smetterò mai di mentire a me stesso?');
INSERT INTO domande_esistenziali (domanda) VALUES ('di chi è la mia testa? Quante delle cose che penso vengono da altri ma le credo mie?');
INSERT INTO domande_esistenziali (domanda) VALUES ('chi sono?');
INSERT INTO domande_esistenziali (domanda) VALUES ('possono essere sei crediti sufficienti per una materia del genere?');
INSERT INTO domande_esistenziali (domanda) VALUES ('perché è così difficile zittire ogni mio pensiero?');
INSERT INTO domande_esistenziali (domanda) VALUES ('cosa significherà l"insegnamento "ricordati di te"?');
INSERT INTO domande_esistenziali (domanda) VALUES ('perché le zanzare saltano fuori solo quando accendo la luce?');
INSERT INTO domande_esistenziali (domanda) VALUES ('quali sono i miei rimpianti?');
INSERT INTO domande_esistenziali (domanda) VALUES ('potessi incontrare una persona defunta su questo mondo per avere l"opportunità di parlarci, quale sarebbe?');
INSERT INTO domande_esistenziali (domanda) VALUES ('come cambiare?');


CREATE TABLE valuta (
	id INT AUTO_INCREMENT PRIMARY KEY,
    moneta VARCHAR(10)
);
INSERT INTO valuta(moneta) VALUES('HNL');
INSERT INTO valuta(moneta) VALUES('MKD');
INSERT INTO valuta(moneta) VALUES('DJF');
INSERT INTO valuta(moneta) VALUES('IDR');
INSERT INTO valuta(moneta) VALUES('VND');

CREATE TABLE vantaggi(
	id INT AUTO_INCREMENT PRIMARY KEY,
    premio VARCHAR(255)
);

INSERT INTO vantaggi(premio) VALUES ('tredicesima ogni anno bisestile garantita!');
INSERT INTO vantaggi(premio) VALUES ('straordinari gratis!');
INSERT INTO vantaggi(premio) VALUES ('pausa pranzo estesa a 5 minuti');
INSERT INTO vantaggi(premio) VALUES ('accesso gratuito al bagno durante le ore di smartworking');
INSERT INTO vantaggi(premio) VALUES ('un originale riproduzione della leggendaria katana appartenuta a Giulio Cesare (riscattabile solo dopo la pensione)');

CREATE TABLE compensi(
id INT AUTO_INCREMENT PRIMARY KEY,
soldi VARCHAR(20)
);
INSERT INTO compensi(soldi) VALUES('268 / 402');
INSERT INTO compensi(soldi) VALUES('615 / 923');
INSERT INTO compensi(soldi) VALUES('1932 / 2899');
INSERT INTO compensi(soldi) VALUES('174500 / 261750');
INSERT INTO compensi(soldi) VALUES('276447 / 414671');