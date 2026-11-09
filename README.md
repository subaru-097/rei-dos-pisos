# O Rei do Piso, mostruário do app

App do cliente, painel do vendedor e painel do dono em uma página só, com dados de exemplo.
No topo da página, a barra troca entre **Cliente**, **Vendedor** e **Dono**, e o botão do sol/lua troca entre modo claro e escuro.

- `index.html`: o app pronto. É o único arquivo que a Vercel precisa.
- `src/`: o código separado (estilo, cliente, painel, vidro).
- `assets/`: as texturas e fotos usadas no app.
- `build.py`: junta `src/` e `assets/` de novo no `index.html` depois de uma alteração (`python build.py`).

Na Vercel: importe o repositório, escolha o preset **Other**, deixe o build vazio e a pasta de saída como a raiz. Não precisa de variáveis de ambiente.

Ainda não usa o Supabase: pedidos, agendamentos e entregas ficam só na tela enquanto ela está aberta.
