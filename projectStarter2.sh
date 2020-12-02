#!/usr/bin/bash
mkdir "$1"; 
touch "$1"/index.html;
echo 'Creating a new project';
echo "$2" > index.html;
mkdir css;
cd css;
touch style.css;
cd ..;
mkdir js;
cd js;
touch app.js;
cd ..;
echo "All done!";
chmod +x projectStarter;
