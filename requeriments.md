# Api Lavanderia em NodeJS - 13ed

A Growdev contratou sua equipe para desenvolver uma api Rest para um cliente. O projeto é para o desenvolvimento de uma aplicação que visa gerenciar como é feito o agendamento de lavanderias de
condomínios.

Cada morador deve ter acesso a aplicação para poder atualizar suas informações, registrar e excluir seus horários.

Durante o agendamento de horários deve ser verificado se a máquina já está reservada por outro morador ou o requisitante não tenha um horário já agendado no período de 4 dias antes ou depois da data solicitada.

Cada reserva terá um horário fixo que será 1: {06:00 a 12:00} e 2:{12:00 a 18:00}

Tem 2 máquinas

## Entidades

### Apartamento

- id: string
- numero: string
- nomeMorador: string
- agendamentos: Agendamento[]
- senha: string
- ocupado: boolean

### Agendamento

- id: string
- dia: Date
- hora: Enum< horas >
- máquina: Enum< maquina >
- userId: string

## Requisitos Funcionais

### Apartamentos

- Permitir atualizar informações quando o apartamento estiver ocupado
- Resetar as informações do apartamento, assim que ficar vazio.
- Filtrar apartamentos por ocupação(boolean), nome do morador(string) e número do ap(string)

### Horário

- Não pode agendar se o apartamento estiver com o status vazio.

### Horário

- Agendar
- Cancelar
- Atualizar
- Visualizar

### Apartamento

- Criar
- Atualizar (senha, nomeDoMorador, ocupado)
