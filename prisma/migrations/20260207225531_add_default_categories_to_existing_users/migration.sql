-- Inserir categorias padrão para todos os usuários existentes
-- Usa ON CONFLICT DO NOTHING para evitar duplicatas (baseado na constraint unique de user_id + name)
INSERT INTO categories (id, name, user_id, scope, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  category.name,
  u.id,
  category.scope::"CategoryScope",
  NOW(),
  NOW()
FROM users u
CROSS JOIN (
  VALUES 
    ('Salário', 'INCOME'),
    ('Freelance', 'INCOME'),
    ('Investimentos', 'BOTH'),
    ('Alimentação', 'OUTCOME'),
    ('Mercado', 'OUTCOME'),
    ('Aluguel', 'OUTCOME'),
    ('Água', 'OUTCOME'),
    ('Luz', 'OUTCOME'),
    ('Internet', 'OUTCOME'),
    ('Lazer', 'OUTCOME'),
    ('Saúde', 'OUTCOME'),
    ('Educação', 'OUTCOME')
) AS category(name, scope)
ON CONFLICT (user_id, name) DO NOTHING;