# `autocomplete`

Displays instructions for enabling `fauna-shell` command autocompletion.

terminal

```bash
fauna autocomplete [SHELL]
```

## [](#description)Description

Displays instructions for autocompleting `fauna-shell` commands and options in a terminal. Currently, the Bash and ZSH shells are supported. Autocompletion makes `fauna-shell` easier to use, especially when using it repeatedly.

## [](#arguments)Arguments

  

Argument

Description

`SHELL`

Optional - Specifies the shell to use for autocompletion. One of `bash` or `zsh`. The default is `bash`.

## [](#options)Options

  

Option

Description

`-r` or `--refresh-cache`

Optional - Refreshes the autocompletion cache for fauna-shell.

## [](#examples)Examples

The following example demonstrates the output for the default Bash shell:

shell

```shell
fauna autocomplete
Building the autocomplete cache... done

Setup Instructions for FAUNA CLI Autocomplete ---

1) Add the autocomplete env var to your bash profile and source it
$ printf "$(fauna autocomplete:script bash)" >> ~/.bashrc; source ~/.bashrc

NOTE: If your terminal starts as a login shell you may need to print the init script into ~/.bash_profile or ~/.profile.

2) Test it out, e.g.:
$ fauna <TAB><TAB>                 # Command completion
$ fauna command --<TAB><TAB>       # Flag completion

Enjoy!
```

Follow the instructions to enable autocompletion.

Was this article helpful?