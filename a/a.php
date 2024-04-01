<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Log</title>
</head>
<body>
    <h1>Ver Log</h1>
    <div id="logOutput"></div>
    <script>
        function updateLog() {
            var logOutput = document.getElementById('logOutput');
            // Realiza uma requisição AJAX para obter o conteúdo atualizado do log
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'mylog.txt');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Atualiza o conteúdo do log
                    logOutput.innerHTML = xhr.responseText;
                }
                // Agendamos a próxima atualização após 1 segundo
                setTimeout(updateLog, 1000);
            };
            xhr.send();
        }

        // Inicia o processo de atualização do log
        updateLog();
    </script>
</body>
</html>
