-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-05-08 19:39:10.537

-- tables
-- Table: Book
CREATE TABLE Book (
    Book_ID int  NOT NULL,
    Google_API_ID int  NOT NULL,
    ISBN bigint  NOT NULL,
    Title int  NOT NULL,
    CONSTRAINT Book_pk PRIMARY KEY (Book_ID)
);

-- Table: Bookshelf
CREATE TABLE Bookshelf (
    Bookshelf_ID int  NOT NULL,
    Name varchar(255)  NULL,
    Room_ID int  NOT NULL,
    CONSTRAINT Bookshelf_pk PRIMARY KEY (Bookshelf_ID)
);

-- Table: Owned_Book
CREATE TABLE Owned_Book (
    Owned_Book_ID int  NOT NULL,
    Availability boolean  NULL,
    Condition int  NULL,
    User_ID int  NOT NULL,
    Book_Book_ID int  NOT NULL,
    Bookshelf_ID int  NOT NULL,
    Transaction_ID int  NOT NULL,
    CONSTRAINT Owned_Book_pk PRIMARY KEY (Owned_Book_ID)
);

-- Table: Review
CREATE TABLE Review (
    Rewiew_ID int  NOT NULL,
    Content text  NULL,
    Hidden boolean  NOT NULL,
    Rating int  NULL,
    Reported boolean  NOT NULL,
    Borrower_ID int  NOT NULL,
    Renter_ID int  NOT NULL,
    CONSTRAINT Review_pk PRIMARY KEY (Rewiew_ID)
);

-- Table: Room
CREATE TABLE Room (
    Room_ID int  NOT NULL,
    Name varchar(255)  NULL,
    User_ID int  NOT NULL,
    CONSTRAINT Room_pk PRIMARY KEY (Room_ID)
);

-- Table: Transaction
CREATE TABLE Transaction (
    Transaction_ID int  NOT NULL,
    Reservation_Date timestamp  NOT NULL,
    Starting_Date date  NULL,
    Ending_Date date  NULL,
    Status int  NOT NULL,
    User_ID int  NOT NULL,
    CONSTRAINT Transaction_pk PRIMARY KEY (Transaction_ID)
);

-- Table: User
CREATE TABLE "User" (
    ID int  NOT NULL,
    Avatar varchar(255)  NULL,
    City varchar(255)  NULL,
    Email varchar(255)  NOT NULL,
    Password varchar(255)  NOT NULL,
    Key varchar(255)  NULL,
    Permissions int  NULL,
    Phone_Number int  NULL,
    Username varchar(255)  NOT NULL,
    Verification_Hash varchar(255)  NULL,
    Owned_Book_OwnedBookID int  NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY (ID)
);

-- Table: Wanted_Book
CREATE TABLE Wanted_Book (
    Wanted_Book_ID int  NOT NULL,
    User_ID int  NOT NULL,
    Book_BookID int  NOT NULL,
    CONSTRAINT Wanted_Book_pk PRIMARY KEY (Wanted_Book_ID)
);

-- foreign keys
-- Reference: Exist (table: Owned_Book)
ALTER TABLE Owned_Book ADD CONSTRAINT Exist
    FOREIGN KEY (Book_Book_ID)
    REFERENCES Book (Book_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Get (table: Review)
ALTER TABLE Review ADD CONSTRAINT Get
    FOREIGN KEY (Borrower_ID)
    REFERENCES "User" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Give (table: Review)
ALTER TABLE Review ADD CONSTRAINT Give
    FOREIGN KEY (Borrower_ID)
    REFERENCES "User" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: HaveBook (table: Owned_Book)
ALTER TABLE Owned_Book ADD CONSTRAINT HaveBook
    FOREIGN KEY (User_ID)
    REFERENCES "User" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: HaveRoom (table: Room)
ALTER TABLE Room ADD CONSTRAINT HaveRoom
    FOREIGN KEY (User_ID)
    REFERENCES "User" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: IsBorrowed (table: User)
ALTER TABLE "User" ADD CONSTRAINT IsBorrowed
    FOREIGN KEY (Owned_Book_OwnedBookID)
    REFERENCES Owned_Book (Owned_Book_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: IsInsideBookshelf (table: Owned_Book)
ALTER TABLE Owned_Book ADD CONSTRAINT IsInsideBookshelf
    FOREIGN KEY (Bookshelf_ID)
    REFERENCES Bookshelf (Bookshelf_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: IsInsideRoom (table: Bookshelf)
ALTER TABLE Bookshelf ADD CONSTRAINT IsInsideRoom
    FOREIGN KEY (Room_ID)
    REFERENCES Room (Room_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: IsReserved (table: Owned_Book)
ALTER TABLE Owned_Book ADD CONSTRAINT IsReserved
    FOREIGN KEY (Transaction_ID)
    REFERENCES Transaction (Transaction_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: IsWanted (table: Wanted_Book)
ALTER TABLE Wanted_Book ADD CONSTRAINT IsWanted
    FOREIGN KEY (Book_BookID)
    REFERENCES Book (Book_ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Reservate (table: Transaction)
ALTER TABLE Transaction ADD CONSTRAINT Reservate
    FOREIGN KEY (User_ID)
    REFERENCES "User" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Want (table: Wanted_Book)
ALTER TABLE Wanted_Book ADD CONSTRAINT Want
    FOREIGN KEY (User_ID)
    REFERENCES "User" (ID)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- sequences
-- Sequence: Book_seq
CREATE SEQUENCE Book_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: Owned_Book_seq
CREATE SEQUENCE Owned_Book_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: User_seq
CREATE SEQUENCE User_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: Wanted_Book_seq
CREATE SEQUENCE Wanted_Book_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- End of file.

