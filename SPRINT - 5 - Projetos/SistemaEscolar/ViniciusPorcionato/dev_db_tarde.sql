--criação do Banco de Dados
CREATE DATABASE dev_db_tarde
go

use dev_db_tarde
go

create table Professor(
ProfessorId int primary key identity,
Nome VARCHAR(255),
Email VARCHAR(255) unique,
Senha VARCHAR(255)
)
go

create table Turma (
TurmaId int primary key identity,
Nome VARCHAR(255),
ProfessorId int foreign key references Professor(ProfessorId)
)
go

create table Atividade (
AtividadeId int primary key identity,
Descricao VARCHAR(255),
TurmaId int foreign key references Turma(TurmaId)
)
go

--inserção de dados nas tabelas
insert into Professor(Nome,Email,Senha)
values('Catarina', 'catarina@email.com', 'catarina123'),
('Rebeca', 'rebeca@email.com', 'rebeca123'),
('Paladino', 'paladino@email.com', 'paladino123')
go

insert into Turma(Nome,ProfessorId)
values('Dev 2025' , 1),
('Cyber 2025' , 2),
('Redes 2025' , 3)
go

insert into Atividade(Descricao,TurmaId)
values('Lógica de Programação' , 1),
('Pentest' , 2),
('Estatistica' , 3)
go
