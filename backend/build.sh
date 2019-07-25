
if [ -d ../node_modules ]; then
    mv ../node_modules ../node_modules_tmp
fi

yarn run tsc

if [ -d ../node_modules_tmp ]; then
    mv ../node_modules_tmp ../node_modules
fi
