import { lstat, readdir, readFile, realpath } from "node:fs/promises";
import { join } from "node:path";
import {
  displayPath,
  instructionsDir,
  linkSpecs,
  repoRoot,
  skillsDir,
} from "./config.ts";

let failures = 0;

function ok(message: string): void {
  console.log(`✓ ${message}`);
}

function fail(message: string): void {
  failures += 1;
  console.error(`✗ ${message}`);
}

if (process.versions.bun) {
  ok(`Bun ${process.versions.bun}`);
} else {
  fail("o doctor deve ser executado com Bun");
}

try {
  await lstat(join(repoRoot, ".git"));
  ok(`repositório Git em ${displayPath(repoRoot)}`);
} catch {
  fail(`repositório Git ausente em ${displayPath(repoRoot)}`);
}

for (const spec of linkSpecs) {
  try {
    const targetStats = await lstat(spec.target);
    if (!targetStats.isSymbolicLink()) {
      fail(`${spec.label}: ${displayPath(spec.target)} não é um link simbólico`);
      continue;
    }

    const [sourcePath, targetPath] = await Promise.all([
      realpath(spec.source),
      realpath(spec.target),
    ]);
    if (sourcePath === targetPath) {
      ok(`${spec.label}: ${displayPath(spec.target)}`);
    } else {
      fail(`${spec.label}: o link aponta para outro destino`);
    }
  } catch (error) {
    fail(`${spec.label}: ${(error as Error).message}`);
  }
}

try {
  const claudeInstructions = await readFile(
    join(instructionsDir, "CLAUDE.md"),
    "utf8",
  );
  if (claudeInstructions.split(/\r?\n/).includes("@AGENTS.md")) {
    ok("CLAUDE.md importa AGENTS.md");
  } else {
    fail("CLAUDE.md não importa AGENTS.md");
  }
} catch (error) {
  fail(`não foi possível validar CLAUDE.md: ${(error as Error).message}`);
}

try {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skillDirectories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (skillDirectories.length === 0) {
    fail("nenhuma skill encontrada");
  }

  for (const directory of skillDirectories) {
    const skillFile = join(skillsDir, directory, "SKILL.md");
    try {
      const content = await readFile(skillFile, "utf8");
      const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const name = frontmatter?.[1]
        ?.match(/^name:\s*["']?([^"'\r\n]+)["']?\s*$/m)?.[1];

      if (!frontmatter) {
        fail(`${directory}: frontmatter ausente em SKILL.md`);
      } else if (!name) {
        fail(`${directory}: campo name ausente em SKILL.md`);
      } else if (name !== directory) {
        fail(`${directory}: name declarado como ${name}`);
      } else {
        ok(`skill ${directory}`);
      }
    } catch (error) {
      fail(`${directory}: ${(error as Error).message}`);
    }
  }
} catch (error) {
  fail(`não foi possível ler skills/: ${(error as Error).message}`);
}

if (failures > 0) {
  console.error(`\n${failures} problema(s) encontrado(s).`);
  process.exit(1);
}

console.log("\nConfiguração válida.");
