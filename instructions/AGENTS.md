## Idioma

- Responda sempre ao usuário em português brasileiro (PT-BR).
- Preserve no código o idioma, o estilo e as convenções já adotados pelo projeto,
  inclusive em identificadores, comentários, documentação e mensagens. Não
  traduza esses elementos apenas para adequá-los ao idioma da resposta.

## Gerenciamento de dependências

- Antes de adicionar, remover ou atualizar dependências, identifique qual
  gerenciador de pacotes o projeto já usa, verificando arquivos de lock,
  manifestos, campos como `packageManager`, configurações de workspace e a
  documentação do repositório. Continue usando o mesmo gerenciador; não introduza
  outro sem solicitação explícita.
- Priorize sempre a CLI oficial do ecossistema para alterar dependências e seus
  manifestos, por exemplo `flutter pub add`, `dart pub add`, `pnpm add`,
  `npm install` ou `bun add`, em vez de editar manualmente arquivos como
  `pubspec.yaml` ou `package.json` quando a operação for suportada pela CLI.
- Nunca edite arquivos de lock manualmente. Gere ou atualize `pubspec.lock`,
  `pnpm-lock.yaml`, `package-lock.json`, `bun.lock` e arquivos equivalentes
  somente por meio do gerenciador de pacotes correspondente.

## Criação de projetos

- Ao iniciar um projeto, priorize o comando oficial de criação ou scaffolding do
  framework/ecossistema, como `flutter create`, `pnpm create` ou
  `pnpm dlx create-...`, em vez de criar manualmente a estrutura, os manifestos e
  os arquivos de configuração quando houver uma CLI apropriada.
- Para novos projetos JavaScript ou TypeScript, use `pnpm` como gerenciador de
  pacotes padrão quando o usuário, o template ou o ambiente não especificarem
  outro. Ao executar um gerador, selecione também `pnpm` nas opções ou flags
  disponíveis para evitar a criação de lockfiles de outro gerenciador.

## Gerenciamento de skills

- Nunca crie, edite, mova, renomeie ou exclua um arquivo de uma skill sem antes
  pedir e receber autorização explícita do usuário para a modificação.
