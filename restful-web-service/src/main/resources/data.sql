INSERT INTO users(username, password)
	VALUES('daniel', '$2a$10$uPW6.cusgdw0yfXrQGi8Les7prZ1Xyxyl0EmJSzzvoMclWtXacHJO');
	
INSERT INTO users(username, password)
	VALUES('daniel2', '$2a$10$uPW6.cusgdw0yfXrQGi8Les7prZ1Xyxyl0EmJSzzvoMclWtXacHJO');
	
INSERT INTO users(username, password)
	VALUES('danielagain', '$2a$10$uPW6.cusgdw0yfXrQGi8Les7prZ1Xyxyl0EmJSzzvoMclWtXacHJO');
	
INSERT INTO users(username, password)
	VALUES('notdaniel', '$2a$10$uPW6.cusgdw0yfXrQGi8Les7prZ1Xyxyl0EmJSzzvoMclWtXacHJO');

INSERT INTO passwords(id, name, url, username, password, notes, user_username)
	VALUES(100, 'db', 'test.com', 'dan', 'SAT5+r0jsXps8I6b08VL/A==', 'No notes', 'daniel');
	
INSERT INTO passwords(id, name, url, username, password, notes, user_username)
	VALUES(101, 'db2', 'test2.com', 'dan2', '2nvBGIVCn1tlwg2XTs0dQw==', 'No notes2', 'notdaniel');
	
INSERT INTO passwords(id, name, url, username, password, notes, user_username)
	VALUES(102, 'db3', 'test3.com', 'dan3', '+8liLYf5swlI8rKiowYQGw==', 'No notes3', 'daniel');
	
INSERT INTO passwords(id, name, url, username, password, notes, user_username)
	VALUES(103, 'db4', 'test4.com', 'dan4', 'KOwiHq2G9/W1B93RyBm8hQ==', 'No notes4', 'daniel');