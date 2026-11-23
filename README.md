# WAZARSKY CLOUD PC — Protótipo 0.1

## O que é
Interface desktop PWA que abre no navegador Android e pode ser adicionada à tela inicial.
Esta entrega é a camada visual, NÃO uma máquina virtual Windows/Linux em nuvem.

## Como abrir
1. Extraia o ZIP.
2. Hospede a pasta em um serviço estático HTTPS (por exemplo, GitHub Pages) ou abra `index.html` localmente para testar.
3. Para instalar como aplicativo, abra o endereço HTTPS no Chrome/ navegador compatível e use o menu > Adicionar à tela inicial / Instalar app.

## Funciona nesta versão
- Desktop e barra de tarefas
- Menu iniciar e janelas
- Explorador visual demonstrativo
- Terminal demonstrativo (não executa comandos reais)
- Abertura de sites em nova aba
- Editor com exportação de TXT
- Cache offline básico via service worker em HTTPS/localhost

## Ainda não implementado
- Kernel Linux ou Windows
- VM persistente em nuvem
- Terminal real
- Arquivos reais do Android
- Login multiusuário, armazenamento remoto ou streaming
- Roblox Studio

## Próxima etapa técnica
Conectar um ambiente Linux real separado (por exemplo, Linux local via UserLAnd) e, posteriormente, um host remoto próprio com acesso remoto autenticado. Não exponha VNC/SSH diretamente à internet sem autenticação e proteção.

## Licença
Protótipo original para estudo. Não inclui sistema operacional, imagens de sistema ou software de terceiros.
