
type CommandOutput = {
  text: string;
  type: "standard" | "error" | "success";
};

export type Command = {
  id: string;
  name: string;
  category: string;
  description: string;
  syntax: string;
  examples: {
    command: string;
    explanation: string;
  }[];
  allowedCommands: string[];
  output: Record<string, CommandOutput[]>;
};

export const commandCategories = [
  { id: "navigation", name: "Navigation", icon: "folder" },
  { id: "file-management", name: "File Management", icon: "file" },
  { id: "system-info", name: "System Info", icon: "info" },
  { id: "text-processing", name: "Text Processing", icon: "file-text" },
];

export const commandsData: Command[] = [
  {
    id: "ls",
    name: "ls",
    category: "navigation",
    description: "List directory contents",
    syntax: "ls [options] [directory]",
    examples: [
      { command: "ls", explanation: "Lists all files and directories in the current directory" },
      { command: "ls -l", explanation: "Lists files in long format with additional details" },
      { command: "ls -a", explanation: "Lists all files including hidden ones" },
    ],
    allowedCommands: ["ls", "ls -l", "ls -a", "ls -la", "ls -al"],
    output: {
      "ls": [{ 
        text: "Documents  Downloads  Pictures  Music  example.txt  notes.md", 
        type: "standard" 
      }],
      "ls -l": [{ 
        text: "drwxr-xr-x  2 user  staff  4096 Apr 15 14:23 Documents\ndrwxr-xr-x  2 user  staff  4096 Apr 12 10:45 Downloads\ndrwxr-xr-x  2 user  staff  4096 Apr 10 09:32 Pictures\ndrwxr-xr-x  2 user  staff  4096 Apr 14 11:12 Music\n-rw-r--r--  1 user  staff   521 Apr 11 08:45 example.txt\n-rw-r--r--  1 user  staff   235 Apr 13 16:22 notes.md", 
        type: "standard" 
      }],
      "ls -a": [{ 
        text: ".  ..  .bash_history  .bashrc  Documents  Downloads  Pictures  Music  example.txt  notes.md", 
        type: "standard" 
      }],
      "ls -la": [{ 
        text: "total 56\ndrwxr-xr-x  10 user  staff   320 Apr 15 14:23 .\ndrwxr-xr-x   5 user  staff   160 Apr  8 09:12 ..\n-rw-------   1 user  staff  2831 Apr 15 11:34 .bash_history\n-rw-r--r--   1 user  staff   220 Apr  8 09:12 .bashrc\ndrwxr-xr-x   2 user  staff  4096 Apr 15 14:23 Documents\ndrwxr-xr-x   2 user  staff  4096 Apr 12 10:45 Downloads\ndrwxr-xr-x   2 user  staff  4096 Apr 10 09:32 Pictures\ndrwxr-xr-x   2 user  staff  4096 Apr 14 11:12 Music\n-rw-r--r--   1 user  staff   521 Apr 11 08:45 example.txt\n-rw-r--r--   1 user  staff   235 Apr 13 16:22 notes.md", 
        type: "standard" 
      }],
      "ls -al": [{ 
        text: "total 56\ndrwxr-xr-x  10 user  staff   320 Apr 15 14:23 .\ndrwxr-xr-x   5 user  staff   160 Apr  8 09:12 ..\n-rw-------   1 user  staff  2831 Apr 15 11:34 .bash_history\n-rw-r--r--   1 user  staff   220 Apr  8 09:12 .bashrc\ndrwxr-xr-x   2 user  staff  4096 Apr 15 14:23 Documents\ndrwxr-xr-x   2 user  staff  4096 Apr 12 10:45 Downloads\ndrwxr-xr-x   2 user  staff  4096 Apr 10 09:32 Pictures\ndrwxr-xr-x   2 user  staff  4096 Apr 14 11:12 Music\n-rw-r--r--   1 user  staff   521 Apr 11 08:45 example.txt\n-rw-r--r--   1 user  staff   235 Apr 13 16:22 notes.md", 
        type: "standard" 
      }],
    }
  },
  {
    id: "cd",
    name: "cd",
    category: "navigation",
    description: "Change directory",
    syntax: "cd [directory]",
    examples: [
      { command: "cd Documents", explanation: "Change to the Documents directory" },
      { command: "cd ..", explanation: "Move up one directory level" },
      { command: "cd ~", explanation: "Change to your home directory" },
    ],
    allowedCommands: ["cd", "cd Documents", "cd ..", "cd ~", "cd /"],
    output: {
      "cd": [{ 
        text: "Changed to home directory", 
        type: "success" 
      }],
      "cd Documents": [{ 
        text: "Changed to /home/user/Documents", 
        type: "success" 
      }],
      "cd ..": [{ 
        text: "Changed to parent directory", 
        type: "success" 
      }],
      "cd ~": [{ 
        text: "Changed to home directory", 
        type: "success" 
      }],
      "cd /": [{ 
        text: "Changed to root directory", 
        type: "success" 
      }],
    }
  },
  {
    id: "pwd",
    name: "pwd",
    category: "navigation",
    description: "Print working directory",
    syntax: "pwd",
    examples: [
      { command: "pwd", explanation: "Shows the current directory path" },
    ],
    allowedCommands: ["pwd"],
    output: {
      "pwd": [{ 
        text: "/home/user", 
        type: "standard" 
      }],
    }
  },
  {
    id: "mkdir",
    name: "mkdir",
    category: "file-management",
    description: "Make directories",
    syntax: "mkdir [options] directory_name(s)",
    examples: [
      { command: "mkdir projects", explanation: "Creates a directory named 'projects'" },
      { command: "mkdir -p projects/web/css", explanation: "Creates nested directories including parents" },
    ],
    allowedCommands: ["mkdir projects", "mkdir -p projects/web/css", "mkdir documents photos"],
    output: {
      "mkdir projects": [{ 
        text: "Directory 'projects' created", 
        type: "success" 
      }],
      "mkdir -p projects/web/css": [{ 
        text: "Nested directories created", 
        type: "success" 
      }],
      "mkdir documents photos": [{ 
        text: "Directories 'documents' and 'photos' created", 
        type: "success" 
      }],
    }
  },
  {
    id: "rm",
    name: "rm",
    category: "file-management",
    description: "Remove files or directories",
    syntax: "rm [options] file(s)",
    examples: [
      { command: "rm file.txt", explanation: "Deletes 'file.txt'" },
      { command: "rm -r directory", explanation: "Recursively deletes a directory and its contents" },
      { command: "rm -f file.txt", explanation: "Forcefully deletes without prompting" },
    ],
    allowedCommands: ["rm file.txt", "rm -r directory", "rm -f file.txt", "rm -rf directory"],
    output: {
      "rm file.txt": [{ 
        text: "File 'file.txt' removed", 
        type: "success" 
      }],
      "rm -r directory": [{ 
        text: "Directory 'directory' and its contents removed", 
        type: "success" 
      }],
      "rm -f file.txt": [{ 
        text: "File 'file.txt' forcefully removed", 
        type: "success" 
      }],
      "rm -rf directory": [{ 
        text: "Directory 'directory' forcefully removed with all contents", 
        type: "success" 
      }],
    }
  },
  {
    id: "cp",
    name: "cp",
    category: "file-management",
    description: "Copy files and directories",
    syntax: "cp [options] source destination",
    examples: [
      { command: "cp file.txt backup/", explanation: "Copies file.txt to the backup directory" },
      { command: "cp -r dir1 dir2", explanation: "Recursively copies dir1 to dir2" },
    ],
    allowedCommands: ["cp file.txt backup/", "cp -r dir1 dir2"],
    output: {
      "cp file.txt backup/": [{ 
        text: "'file.txt' copied to 'backup/' directory", 
        type: "success" 
      }],
      "cp -r dir1 dir2": [{ 
        text: "Directory 'dir1' and its contents copied to 'dir2'", 
        type: "success" 
      }],
    }
  },
  {
    id: "mv",
    name: "mv",
    category: "file-management",
    description: "Move or rename files",
    syntax: "mv [options] source destination",
    examples: [
      { command: "mv file.txt newname.txt", explanation: "Renames file.txt to newname.txt" },
      { command: "mv file.txt dir/", explanation: "Moves file.txt to dir directory" },
    ],
    allowedCommands: ["mv file.txt newname.txt", "mv file.txt dir/", "mv *.txt docs/"],
    output: {
      "mv file.txt newname.txt": [{ 
        text: "'file.txt' renamed to 'newname.txt'", 
        type: "success" 
      }],
      "mv file.txt dir/": [{ 
        text: "'file.txt' moved to 'dir/' directory", 
        type: "success" 
      }],
      "mv *.txt docs/": [{ 
        text: "All text files moved to 'docs/' directory", 
        type: "success" 
      }],
    }
  },
  {
    id: "cat",
    name: "cat",
    category: "text-processing",
    description: "Concatenate and display file content",
    syntax: "cat [options] [file(s)]",
    examples: [
      { command: "cat file.txt", explanation: "Displays the contents of file.txt" },
      { command: "cat -n file.txt", explanation: "Displays contents with line numbers" },
    ],
    allowedCommands: ["cat file.txt", "cat -n file.txt", "cat file1.txt file2.txt"],
    output: {
      "cat file.txt": [{ 
        text: "This is the content of the file.\nIt contains multiple lines of text.\nEnd of file.", 
        type: "standard" 
      }],
      "cat -n file.txt": [{ 
        text: "     1\tThis is the content of the file.\n     2\tIt contains multiple lines of text.\n     3\tEnd of file.", 
        type: "standard" 
      }],
      "cat file1.txt file2.txt": [{ 
        text: "Content of file1.txt:\nHello world\n\nContent of file2.txt:\nAnother file's content", 
        type: "standard" 
      }],
    }
  },
  {
    id: "grep",
    name: "grep",
    category: "text-processing",
    description: "Search text using patterns",
    syntax: "grep [options] pattern [file(s)]",
    examples: [
      { command: "grep 'hello' file.txt", explanation: "Searches for 'hello' in file.txt" },
      { command: "grep -i 'hello' file.txt", explanation: "Case-insensitive search for 'hello'" },
      { command: "grep -r 'hello' dir/", explanation: "Recursively searches in directory" },
    ],
    allowedCommands: ["grep 'hello' file.txt", "grep -i 'hello' file.txt", "grep -r 'hello' dir/"],
    output: {
      "grep 'hello' file.txt": [{ 
        text: "hello world\nsay hello to everyone", 
        type: "standard" 
      }],
      "grep -i 'hello' file.txt": [{ 
        text: "hello world\nHello everyone\nsay hello to everyone", 
        type: "standard" 
      }],
      "grep -r 'hello' dir/": [{ 
        text: "dir/file1.txt:hello there\ndir/subdir/file2.txt:hello world", 
        type: "standard" 
      }],
    }
  },
  {
    id: "ps",
    name: "ps",
    category: "system-info",
    description: "Report process status",
    syntax: "ps [options]",
    examples: [
      { command: "ps", explanation: "Shows processes for the current terminal" },
      { command: "ps aux", explanation: "Shows all running processes" },
    ],
    allowedCommands: ["ps", "ps aux", "ps -ef"],
    output: {
      "ps": [{ 
        text: "  PID TTY          TIME CMD\n 1234 pts/0    00:00:01 bash\n 5678 pts/0    00:00:00 ps", 
        type: "standard" 
      }],
      "ps aux": [{ 
        text: "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 171160  9100 ?        Ss   Apr15   0:02 /sbin/init\nuser      1234  0.0  0.2 115568 10256 pts/0    Ss   10:00   0:01 -bash\nuser      5678  0.0  0.1 155556  8752 pts/0    R+   10:01   0:00 ps aux", 
        type: "standard" 
      }],
      "ps -ef": [{ 
        text: "UID        PID  PPID  C STIME TTY          TIME CMD\nroot         1     0  0 Apr15 ?        00:00:02 /sbin/init\nuser      1234  1233  0 10:00 pts/0    00:00:01 -bash\nuser      5678  1234  0 10:01 pts/0    00:00:00 ps -ef", 
        type: "standard" 
      }],
    }
  },
  {
    id: "top",
    name: "top",
    category: "system-info",
    description: "Display system processes",
    syntax: "top [options]",
    examples: [
      { command: "top", explanation: "Shows real-time system statistics and process information" },
    ],
    allowedCommands: ["top"],
    output: {
      "top": [{ 
        text: "top - 10:02:15 up 3 days, 12:34,  1 user,  load average: 0.08, 0.06, 0.01\nTasks: 132 total,   1 running, 131 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.1 id,  0.4 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :   7861.1 total,   4502.3 free,   1574.6 used,   1784.2 buff/cache\nMiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   5974.2 avail Mem \n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 1234 user      20   0  115568  10256   7628 S   0.0   0.1   0:01.25 bash\n 5678 user      20   0  155556   8752   7416 R   0.0   0.1   0:00.01 top", 
        type: "standard" 
      }],
    }
  },
];
