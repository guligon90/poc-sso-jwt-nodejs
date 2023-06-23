#!/bin/bash

DOCS_DIR=./docs
DIAGRAM_INPUT_DIR="$DOCS_DIR/mmd"
DIAGRAM_OUTPUT_DIR="$DOCS_DIR/img"
DEFAULT_FORMAT="png"

function generate()  {
    ARG=$1
    FORMAT=${ARG:-DEFAULT_FORMAT}

    for MMD_FILE in $DIAGRAM_INPUT_DIR/*.mmd
    do
        echo "Parsing file $file to the '.$FORMAT' format..."
        
        NAME=${MMD_FILE##*/}
        BASE=${NAME%.mmd}
        
        npm run mermaid:cli -- \
            --puppeteerConfigFile puppeteerConfigFile.json \
            -t dark \
            -b transparent \
            -i $MMD_FILE \
            -o "$DIAGRAM_OUTPUT_DIR/$BASE.$FORMAT";
    done
}

function destroy() {
    ARG=$1
    FORMAT=${ARG:-DEFAULT_FORMAT}

    echo "Removing all '.$FORMAT' files in $DIAGRAM_OUTPUT_DIR..."

    rm -rf $DIAGRAM_OUTPUT_DIR/*.$FORMAT
}

$@
