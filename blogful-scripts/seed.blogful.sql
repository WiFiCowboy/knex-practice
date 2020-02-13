BEGIN;
INSERT INTO blogful_articles (title, date_published, content )
  VALUES
  ('Monday', now() - '20 days'
::INTERVAL ,'I like turtles'),
('Alpha', now
() - '20 days'::INTERVAL ,'I like turtles'),
('Bravo', now
() - '20 days'::INTERVAL ,'I like eggs'),
('Charlie', now
() - '20 days'::INTERVAL ,'I like ham'),
('Delta', now
() - '20 days'::INTERVAL ,'I like bacon'),
('Foxtrot', now
() - '20 days'::INTERVAL ,'I like snakes'),
('Echo', now
() - '20 days'::INTERVAL ,'I like pandas'),
('Golf', now
() - '15 days'::INTERVAL ,'I like birds'),
('Hotel', now
() - '15 days'::INTERVAL ,'I like cats'),
('India', now
() - '15 days'::INTERVAL ,'I like dogs'),
('Juliet', now
() - '15 days'::INTERVAL ,'I like fish'),
('Keylo', now
() - '15 days'::INTERVAL ,'I like tacos'),
('Mike', now
() - '15 days'::INTERVAL ,'I like steak'),
('November', now
() - '15 days'::INTERVAL ,'I like sheep'),
('Lima', now
() - '15 days'::INTERVAL ,'I like sleep'),
('Oscar', now
() - '15 days'::INTERVAL ,'I like rabbits'),
('Papa', now
() - '12 days'::INTERVAL ,'I like duck'),
('Queen', now
() - '10 days'::INTERVAL ,'I like rats'),
('Romeo', now
() - '5 days'::INTERVAL ,'I like stuff'),
('Seira', now
() - '2 days'::INTERVAL ,'I like nonsense')
;

COMMIT;