import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

const plugin: tstl.Plugin = {
  beforeEmit(program: ts.Program, options: tstl.CompilerOptions, emitHost: tstl.EmitHost, result: tstl.EmitFile[]) {
    void program;
    void options;
    void emitHost;

    for (const file of result) {
      const lines = file.code.split(/\n/g);

      for (var i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (!line.includes("getByKey")) continue;
        const keys = line.split("getByKey")
        for (var y = 0; y < keys.length; y++) {
          const x = keys[y];
          if (!(x.includes("(") && x.includes('")'))) continue;

          keys[y] = x.replace('("', '').split('")')[0];
          line = line.replace(/:getByKey\([^)]*\)/, `.${keys[y]}`);
        }

        lines[i] = line;
      }

      file.code = lines.join("\n");
    }
  },
};

export default plugin;