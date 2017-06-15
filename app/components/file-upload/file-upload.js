'use strict';

// dichiara il modulo che farà da parente a tutti i servizi/direttive usate per caricare un nuovo file su Firebase
angular.module('myApp.fileUpload', [
    'myApp.fileUpload.fileUploadDirective',
])

.value('version', '0.1') ;