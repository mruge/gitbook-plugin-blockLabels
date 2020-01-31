# Label Objects in the Document

Applies a (*label*) around blocks of text, images, or tables.

*jan-31-2020: Also adds the Header and Footer to PDFs

Theme information copied from https://github.com/GitbookIO/theme-default

## Install

Add the below to your `book.json` file, then run `gitbook install` :

```json
{
    "plugins": ["blocklabel"]
}
```

## Usage

You can mark paragraphs and basic markdown shapes by enclosing them in the following label tag

```markdown
{% label %}
This section needs to be marked with a label
{% endlabel %}
```

You **cannot** mark nested blocks or code blocks.  To accomplish that, insert an empty block section directly below the target section and apply the labelPrev argument

```plantuml
component mydiagram
```
{% label labelPrev='img', label='Draft' %}
{% endlabel %}

The value of labelPrev currently has no effect, it was added for the future feature of specifying the type of the previous object, currently only supports blocks that render as IMG in the final html.

## Configuration

Add the following to *book.json*

if no *defaultLabel* is an empty string, or the config is not defined, only blocks will be labeled.

```json
"pluginsConfig": {
        "blocklabels": {
            "defaultLabel": "IMPORTANT",
            "header": "MY CUSTOM HEADER",
            "footer": "My CUstom Footer"
        }
    }
```
