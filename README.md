# Rafael Almeida Imóveis

Site template para corretor de imóveis de alto padrão — single-page em HTML/CSS/JS puro, responsivo, com modo claro/escuro.

## Estrutura
- `index.html` — todas as seções (hero, portfólio, sobre, serviços, processo, depoimentos, bairros, FAQ, contato)
- `css/base.css` — tokens de design (cores, tipografia, espaçamento)
- `css/style.css` — estilos dos componentes
- `js/main.js` — theme toggle, reveals, contador animado, filtros, FAQ accordion, menu mobile
- `images/` — fotos do corretor, hero e portfólio

## Personalização
1. Troque nome, CRECI, contatos e textos no `index.html`
2. Substitua as imagens em `/images/` mantendo os mesmos nomes
3. Ajuste cores e fontes em `css/base.css`

## Rodar localmente
```bash
python3 -m http.server 8000
```
Abra http://localhost:8000

## Tipografia
- Playfair Display (títulos)
- Inter (corpo)
- Dancing Script (assinatura)
