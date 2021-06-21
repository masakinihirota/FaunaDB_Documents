# `autocomplete`

Displays instructions for enabling `fauna-shell` command autocompletion.

funa-shell "コマンドの自動補完を有効にする手順を表示します。

terminal

```bash
fauna autocomplete [SHELL]
```

## [](#description)Description

Displays instructions for autocompleting `fauna-shell` commands and options in a terminal. Currently, the Bash and ZSH shells are supported. Autocompletion makes `fauna-shell` easier to use, especially when using it repeatedly.

ターミナルで `fauna-shell` コマンドとオプションをオートコンプリートする手順を表示します。現在、Bash と ZSH シェルに対応しています。オートコンプリートは `fauna-shell` を使いやすくし、特に繰り返し使うときに便利です。

## [](#arguments)Arguments

|Argument|Description|
|--|--|
|`SHELL`|Optional - Specifies the shell to use for autocompletion. One of `bash` or `zsh`. The default is `bash`.|

---

|引数|説明|
|--|--|
|`SHELL`|オプション - オートコンプリートに使用するシェルを指定します。bash`または`zsh`のいずれかです。デフォルトは `bash` です。|

## [](#options)Options

|Option|Description|
|--|--|
|`-r` or `--refresh-cache`|Optional - Refreshes the autocompletion cache for fauna-shell.|

---

|オプション|説明|
|--|--|
|`-r` or `--refresh-cache`|オプション - fauna-shell のオートコンプリートキャッシュを再読み込みします。|

## [](#examples)Examples

The following example demonstrates the output for the default Bash shell:

次の例は、デフォルトのBashシェルの出力を示しています。

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

指示に従ってオートコンプリートを有効にしてください。

