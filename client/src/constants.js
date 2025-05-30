export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  cpp: "10.2.0",
  c: "10.2.0",
  python: "3.10.0",
  python2: "2.7.18",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  go: "1.16.2",
  rust: "1.68.2",
  ruby: "3.0.1",
  swift: "5.3.3",
  kotlin: "1.8.20",
  dart: "2.19.6",
  perl: "5.36.0",
  lua: "5.4.4",
  bash: "5.2.0",
  rscript: "4.1.1"
};


  
  export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");`,
  typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")`,
  python2: `def greet(name):\n\tprint "Hello, " + name + "!"\n\ngreet("Alex")`,
  java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Alex!");\n\t}\n}`,
  csharp: `using System;\n\nclass Program {\n\tstatic void Main() {\n\t\tConsole.WriteLine("Hello, Alex!");\n\t}\n}`,
  php: `<?php\n\n$name = 'Alex';\necho "Hello, $name!";`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, Alex!" << endl;\n\treturn 0;\n}`,
  c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello, Alex!\\n");\n\treturn 0;\n}`,
  go: `package main\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Alex!")\n}`,
  rust: `fn main() {\n\tprintln!("Hello, Alex!");\n}`,
  ruby: `def greet(name)\n\tputs "Hello, #{name}!"\nend\n\ngreet("Alex")`,
  swift: `print("Hello, Alex!")`,
  kotlin: `fun main() {\n\tprintln("Hello, Alex!")\n}`,
  dart: `void main() {\n\tprint("Hello, Alex!");\n}`,
  perl: `my $name = "Alex";\nprint "Hello, $name!\\n";`,
  lua: `name = "Alex"\nprint("Hello, " .. name .. "!")`,
  bash: `name="Alex"\necho "Hello, $name!"`,
  rscript: `name <- "Alex"\ncat("Hello,", name, "!\\n")`
};
