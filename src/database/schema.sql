CREATE TABLE usuarios ( 
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (id, nome, email, senha) VALUES
(1, 'João Silva', 'joao.silva@example.com', 'senha123'),
(2, 'Maria Oliveira', 'maria.oliveira@example.com', 'senha456'),
(3, 'Carlos Santos', 'carlos.santos@example.com', 'senha789'),
(4, 'Ana Costa', 'ana.costa@example.com', 'senha101'),
(5, 'Pedro Almeida', 'pedro.almeida@example.com', 'senha202');

CREATE TABLE frases (
    id SERIAL PRIMARY KEY,
    frase TEXT NOT NULL,
    titulo VARCHAR(150),
    autor_frase VARCHAR(100),
    categoria VARCHAR(20) CHECK (categoria IN (
    'Musicas',
    'Filmes',
    'Series',
    'Livros',
    'Autorais',
    'Motivacionais',
    'Reflexões',
    'Amor',
    'Superação',
    'positividade'
    )) NOT NULL,
    curtidas_count INTEGER DEFAULT 0,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL
);



INSERT INTO frases (frase, titulo, autor_frase, categoria, curtidas_count, usuario_id) VALUES
('A vida e um desafio e cada obstaculo e uma licao', 'A Vida e Desafio', 'Racionais MCs', 'Musicas', 12, 1),
('O homem na estrada recomeca sua vida', 'Homem na Estrada', 'Racionais MCs', 'Musicas', 8, 2),
('Amor e respeito nao se compra se conquista', 'Negro Drama', 'Racionais MCs', 'Musicas', 10, 3),
('Nem sempre ganhando nem sempre perdendo mas aprendendo', 'Vida Loka', 'Racionais MCs', 'Musicas', 7, 2),
('O que e o que e E a vida', 'O Que E O Que E', 'Gonzaguinha', 'Musicas', 14, 1),
('Saia dessa vida de ilusao', 'Alugase', 'Raul Seixas', 'Musicas', 9, 4),
('E preciso amar as pessoas como se nao houvesse amanha', 'Pais e Filhos', 'Renato Russo', 'Musicas', 15, 2),
('Hakuna Matata', 'O Rei Leao', 'Timon e Pumba', 'Filmes', 16, 4),
('So se vive uma vez', '007 Operacao Skyfall', 'James Bond', 'Filmes', 10, 2),
('A esperanca e o sonho do homem acordado', 'Etica a Nicomaco', 'Aristoteles', 'Livros', 8, 4),
('Ser feliz sem motivo e a mais autentica forma de felicidade', 'O Livro das Virtudes', 'Carlos Drummond de Andrade', 'Livros', 12, 2),
('Ninguem pode construir em teu lugar as pontes que precisaras passar para cruzar o rio da vida', 'Assim Falou Zaratustra', 'Nietzsche', 'Livros', 11, 1),
('Voce e a sua melhor chance de recomecar', 'Recomecos', 'Giovanna Caron', 'Autorais', 9, 1),
('O silencio tambem fala', 'Reflexao', 'Giovanna Caron', 'Autorais', 10, 3),
('A coragem e a resistencia ao medo nao a ausencia dele', 'Coragem', 'Mark Twain', 'Motivacionais', 10, 1),
('O sucesso e ir de fracasso em fracasso sem perder o entusiasmo', 'Persistencia', 'Winston Churchill', 'Motivacionais', 9, 3),
('A simplicidade e o ultimo grau de sofisticacao', 'Simplicidade', 'Leonardo da Vinci', 'Reflexões', 10, 4);
