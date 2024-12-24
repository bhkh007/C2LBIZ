CREATE TABLE demo
  (
    agentsequence    VARCHAR(15),
    agentname        VARCHAR(20),
    agentdesignation VARCHAR(25),
    channelcd        VARCHAR(20),
    licenseissuedate DATE,
    agentaddress     VARCHAR(100)
  );
INSERT
INTO demo VALUES
  (
    1,
    'Bhavesh',
    'Manager',
    'BancAssurance',
    '14/10/2024',
    'Mumbai'
  );
INSERT
INTO demo VALUES
  (
    2,
    'Tejas',
    'Director',
    'Agency',
    '14/10/2024',
    'Amravati'
  );
INSERT
INTO demo VALUES
  (
    3,
    'Pratik',
    'Agent',
    'Broker',
    '14/10/2024',
    'Solapur',
    100
  );
ALTER TABLE Demo ADD CONSTRAINT Abc PRIMARY KEY (Agentsequence);

SELECT * FROM demo WHERE Agentsequence = 2;

COMMIT;
ROLLBACK;

ALTER TABLE demo MODIFY agentsequence VARCHAR(15) NOT NULL;

SAVEPOINT;
ALTER TABLE demo ADD Pincode VARCHAR(15);

ALTER TABLE demo
DROP column Pincode;

ALTER TABLE demo MODIFY Pincode NUMBER;

RENAME Demos TO Demo;
describe Demo;

COMMENT ON column Demo.AGENTSEQUENCE
IS
  'unique agent identification column';
  
  UPDATE Demo
  SET Agentsequence   = 5,
    Agentname         ='Deep'
  WHERE Agentsequence = 3 AND
    Agentname         ='Pratik';
    
    
    
    CREATE TABLE PARTYDETAILS (
    PARTYSEQUENCE NUMBER CONSTRAINT party_seq  PRIMARY KEY,
    PARTYNAME VARCHAR(30),
    DEPTSEQUENCE NUMBER ,
    PARTYDESIGNATION Varchar(15),
    PARTYNUMBER VARCHAR(10)
    );

DROP TABLE PARTYDETAILS;

  CREATE TABLE PARTYDEPARTMENT(
  DEPARTMENTID NUMBER,
  DEPARTMENTNAME VARCHAR(30),
  )
    ALTER TABLE PARTYDETAILS
    DROP FOREIGN KEY dept_seq_frgn;
    
  TRUNCATE TABLE PARTYDEPARTMENT ;
  DESC PARTYDEPARTMENT;
  DESC PARTYDETAILS;
  SELECT * FROM PARTYDEPARTMENT;
  
  
  ALTER TABLE PARTYDETAILS
  ADD (PARTYLASTNAME VARCHAR(20));
  
  ALTER TABLE PARTYDETAILS
  MODIFY (PARTYLASTNAME VARCHAR(40));
  
  ALTER TABLE PARTYDETAILS
  DROP (PARTYLASTNAME);         -- -OR USE DROP COLUMN PARTYLASTNAME