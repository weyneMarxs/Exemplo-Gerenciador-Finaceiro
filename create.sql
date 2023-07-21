create database app;
create schema financas_pessoais;

create table financas_pessoais.lancamento (
  id serial primary key,
  mes text,
  categoria text,
  tipo text,
  valor numeric
);

insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('janeiro','Salário','receita',3000);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('janeiro', 'Aluguel', 'despesa', 1000);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('janeiro','Conta de Luz','despesa',200);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('janeiro','Conta de Água','despesa',100);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('janeiro','Transporte','despesa',100);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('fevereiro','Salário','receita',3000);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('fevereiro','Aluguel','despesa',1200);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('fevereiro','Conta de Luz','despesa',200);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('fevereiro','Conta de Água','despesa',100);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('fevereiro','Transporte','despesa',500);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('marco','Salário','receita',4000);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('marco','Aluguel','despesa',1200);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('marco','Conta de Luz','despesa',200);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('marco','Conta de Água','despesa',100);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('marco','Transporte','despesa',200);
insert into financas_pessoais.lancamento(mes, categoria, tipo, valor) values('abril','Salário','receita',4000);